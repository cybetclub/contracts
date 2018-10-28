const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('solidity/build/Crowdsale.solCrowdsale.json');

const provider = new HDWalletProvider(
    'XXX 12 WORD MNEMONIC XXX',
    'https://mainnet.infura.io/v3/c7324d665aa54471920f1816c6416bca');
const web3 = new Web3(provider);

const deploy = async (coinAddress) => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from accounts', accounts);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: '0x' + compiledFactory.bytecode, arguments: [coinAddress] })
    .send({ gas: '3000000', from: accounts[0]});

  console.log('Contract deployed @->', result.options.address);

  // CyBet Token - Live -> 0x47785DE3A1a028679fEbc1F4242F2888d7c73BD7
  // CyBet Pre ICO - Live -> 0xAc7B5EEa306739AD5149099A8AE9c05a82566049
};
deploy("0x47785DE3A1a028679fEbc1F4242F2888d7c73BD7");
