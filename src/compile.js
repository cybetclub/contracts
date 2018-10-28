const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'solidity/build');
fs.removeSync(buildPath);

const crowdsalePath = path.resolve(__dirname, 'solidity', 'Crowdsale.sol');
const cyBetTokenPath = path.resolve(__dirname, 'solidity', 'CyBetToken.sol');

input = {
  'CyBetToken.sol': fs.readFileSync(cyBetTokenPath, 'utf8'),
  'Crowdsale.sol': fs.readFileSync(crowdsalePath, 'utf8')
}

const output = solc.compile({sources: input}, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '')+'.json'),
        output[contract]
    )
}
