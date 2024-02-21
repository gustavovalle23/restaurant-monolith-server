import * as crypto from 'crypto';
import * as sqlite3 from 'sqlite3';
import { Block } from './types';


export const createBlock = (index: number, timestamp: Date, data: any, previousHash: string = ''): Block => {
  const hash = calculateHash(index, timestamp, data, previousHash);
  return { index, timestamp, data, previousHash, hash };
};

const calculateHash = (index: number, timestamp: Date, data: any, previousHash: string): string => {
  return crypto.createHash('sha256').update(index + timestamp.toString() + previousHash + JSON.stringify(data)).digest('hex');
};

export const initBlockchain = (db: sqlite3.Database): Promise<Block[]> => {
  return new Promise((resolve, reject) => {
    const chain: Block[] = [];
    db.serialize(() => {
      db.each('SELECT * FROM blocks ORDER BY index ASC', (err: Error | null, row: any) => {
        if (err) {
          reject(err);
        } else {
          const block = createBlock(row.index, new Date(row.timestamp), JSON.parse(row.data), row.previousHash);
          block.hash = row.hash;
          chain.push(block);
        }
      }, () => resolve(chain));
    });
  });
};

const getLatestBlock = (chain: Block[]): Block => {
  return chain[chain.length - 1];
};

export const addBlock = async (db: sqlite3.Database, chain: Block[], newBlock: Block): Promise<void> => {
  newBlock.previousHash = getLatestBlock(chain).hash;
  newBlock.hash = calculateHash(newBlock.index, newBlock.timestamp, newBlock.data, newBlock.previousHash);
  chain.push(newBlock);
  await saveBlockToDatabase(db, newBlock);
};

const saveBlockToDatabase = async (db: sqlite3.Database, block: Block): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare('INSERT INTO blocks (index, timestamp, data, previousHash, hash) VALUES (?, ?, ?, ?, ?)');
      stmt.run(block.index, block.timestamp.toISOString(), JSON.stringify(block.data), block.previousHash, block.hash, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  });
};

export const isChainValid = (chain: Block[]): boolean => {
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];
    if (currentBlock.hash !== calculateHash(currentBlock.index, currentBlock.timestamp, currentBlock.data, currentBlock.previousHash)) {
      return false;
    }
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
};

