require('events').EventEmitter.prototype._maxListeners = 100;
const args = process.argv.slice(2);

const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'XXX 12 WORD MNEMONIC XXX',
    'https://mainnet.infura.io/v3/c7324d665aa54471920f1816c6416bca');
const web3 =  new Web3(provider);

const compiledCrowdsale = require(path.resolve(__dirname, 'solidity/build', 'Crowdsale.solCrowdsale.json'));

let accounts;
let ico = 'ICO NOT loaded!';

const foo = async () => {

  accounts = await web3.eth.getAccounts();
  ico = await new web3.eth.Contract(
    JSON.parse(compiledCrowdsale.interface),
    '0xAc7B5EEa306739AD5149099A8AE9c05a82566049'
  );

  switch(args[0]){
    case 'assertIco':
      console.log('ICO', ico);
      break;
    case 'startIco':
      startIco(accounts[0]);
      break;
    case 'finalizeIco':
      finalizeIco(accounts[0]);
      break;
    case 'basePrice':
      basePrice();
      break;
    case 'cap':
      cap();
      break;
    case 'remainingTokens':
      remainingTokens();
      break;
    case 'tokensSold':
      tokensSold();
      break;
    default:
      console.log('Function <'+args[0]+'> not supported');
  }

};
foo();

const startIco = async (account) => {
  result = await ico.methods.startIco().send({
      from: account,
      gas: '1000000'
   });
  console.log('Transaction Details:', result);
  console.log('\n');
  console.log('ICO started successfully');
};

const finalizeIco = async (account) => {
  result = await ico.methods.finalizeIco().send({
      from: account,
      gas: '1000000'
   });
  console.log('Transaction Details:', result);
  console.log('\n');
  console.log('ICO finalized successfully');
};

const admin = async () => {
  result = await ico.methods.admin().call();
  console.log('Admin:', result);
};

const basePrice = async () => {
  result = await ico.methods.basePrice().call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Base Price:', mantisa+'.'+decimals+' CYBT per 1 ETH');
};

const cap = async () => {
  result = await ico.methods.cap().call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Market Cap:', mantisa+'.'+decimals+' CYBT');
};

const remainingTokens = async () => {
  result = await ico.methods.remainingTokens().call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Remaining Tokens:', mantisa+'.'+decimals+' CYBT');
};

const tokensSold = async () => {
  result = await ico.methods.tokensSold().call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Tokens Sold:', mantisa+'.'+decimals+' CYBT');
};

const putCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
