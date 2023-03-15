const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  try {
  const merkleTree = new MerkleTree(niceList);
  const index = 24;
  const name = niceList[24];
  const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(index);

  console.log('root', root);
  console.log('name:',name);
  console.log('proof:', niceList[index]);
  

  const body = {
    proof,
    name,
  };
  const { data: gift } = await axios.post(`${serverUrl}/gift`, body);

  console.log({ gift });
} catch (error) {
  console.log("In catch block logging error.message:", error.message);
}
}

main();