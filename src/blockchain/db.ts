import * as sqlite3 from 'sqlite3';
import { addBlock, createBlock, initBlockchain, isChainValid } from './builder';

const initDatabase = (db: sqlite3.Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS blocks (index INTEGER PRIMARY KEY, timestamp TEXT, data TEXT, previousHash TEXT, hash TEXT)', (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

const db = new sqlite3.Database(':memory:');

initDatabase(db)
  .then(() => initBlockchain(db))
  .then(chain => {
    const myBlockchain = chain;
    addBlock(db, myBlockchain, createBlock(1, new Date(), { amount: 100 }))
      .then(() => addBlock(db, myBlockchain, createBlock(2, new Date(), { amount: 50 })))
      .then(() => {
        console.log(JSON.stringify(myBlockchain, null, 2));
        console.log('Is blockchain valid?', isChainValid(myBlockchain));
      })
      .catch(err => console.error('Error adding block:', err));
  })
  .catch(err => console.error('Error initializing blockchain:', err));
