const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, timestamp, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp 
            + JSON.stringify(this.data)).toString();

    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "1/1/2018", "0");
    }

    getlastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getlastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }


}

let ericsCoin = new BlockChain();
ericsCoin.addBlock(new Block(1, "10/07/2018", { amount: 4 }));
ericsCoin.addBlock(new Block(2, "12/07/2018", { amount: 10 }));


console.log(JSON.stringify(ericsCoin, null, 4));