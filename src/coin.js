require('events').EventEmitter.prototype._maxListeners = 100;

const args = process.argv.slice(2);

const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'XXX 12 WORD MNEMONIC XXX',
    'https://mainnet.infura.io/v3/c7324d665aa54471920f1816c6416bca');
const web3 =  new Web3(provider);

const compiledCyBet = require(path.resolve(__dirname, 'solidity/build', 'CyBetToken.solCyBetToken.json'));

let accounts;
let coin = 'Coin NOT loaded!';

const foo = async () => {

  accounts = await web3.eth.getAccounts();
  coin = new web3.eth.Contract(
    JSON.parse(compiledCyBet.interface),
    '0x47785DE3A1a028679fEbc1F4242F2888d7c73BD7'
  );

  switch(args[0]){
    case 'assertCoin':
      console.log('Coin', coin);
      break;
    case 'totalSupply':
      totalSupply(coin);
      break;
    case 'balanceOf':
      balanceOf(coin, args[1]);
      break;
    case 'name':
      name(coin);
      break;
    case 'owner':
      owner(coin);
      break;
    case 'symbol':
      symbol(coin);
      break;
    case 'tokenReserve':
      tokenReserve(coin);
      break;
    case 'decimals':
      decimals(coin);
      break;
    case 'allowance':
      allowance(coin, args[1], args[2]);
      break;
    default:
      console.log('Function <'+args[0]+'> not supported');
  }

};
foo();

const totalSupply = async (coin) => {
  result = await coin.methods.totalSupply().call();
  result = (result/1000000000000000000).toFixed(5);
  result = putCommas(result.split('.')[0]);
  console.log('Total Supply:', result+' CYBT');
};

const balanceOf = async (coin, address) => {
  result = await coin.methods.balanceOf(address).call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Balance:', mantisa+'.'+decimals+' CYBT');
};

const name = async (coin) => {
  result = await coin.methods.name().call();
  console.log('Name:', result);
};

const owner = async (coin) => {
  result = await coin.methods.owner().call();
  console.log('Owner:', result);
};

const symbol = async (coin) => {
  result = await coin.methods.symbol().call();
  console.log('Symbol:', result);
};

const tokenReserve = async (coin) => {
  result = await coin.methods.tokenReserve().call();
  result = (result/1000000000000000000).toFixed(5);
  mantisa = putCommas(result.split('.')[0]);
  let decimals = result.split('.')[1];
  console.log('Token Reserve:', mantisa+'.'+decimals+' CYBT');
};

const decimals = async (coin) => {
  result = await coin.methods.decimals().call();
  console.log('Decimals:', result);
};

const allowance = async (coin, owner, spender) => {
  result = await coin.methods.allowance(owner, spender).call();
  console.log('Allowance:', result);
};

const putCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
