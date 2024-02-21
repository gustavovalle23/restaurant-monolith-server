export interface Block {
    index: number;
    timestamp: Date;
    data: any;
    previousHash: string;
    hash: string;
}