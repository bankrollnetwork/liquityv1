require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("solidity-coverage");
require("hardhat-gas-reporter");

const dotenv = require("dotenv");
dotenv.config();

const alchemyAPIKey = process.env.ALCHEMY_API_KEY;

const accounts = require("./hardhatAccountsList2k.js");
const accountsList = accounts.accountsList


module.exports = {
    paths: {
        // contracts: "./contracts",
        // artifacts: "./artifacts"
    },
    solidity: {
        compilers: [
            {
                version: "0.4.23",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100
                    }
                }
            },
            {
                version: "0.5.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100
                    }
                }
            },
            {
                version: "0.6.11",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100
                    }
                }
            },
        ]
    },
    networks: {
        hardhat: {
            accounts: accountsList,
            gas: 10000000,  // tx gas limit
            blockGasLimit: 15000000,
            gasPrice: 20000000000,
            initialBaseFeePerGas: 0,
        },

        tenderly: {
            url: process.env.TENDERLY_FORK_URL,
            gasPrice: process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 20000000000,
            accounts: [
                process.env.DEPLOYER_PRIVATEKEY
            ]
        },

        bsc: {
            url: `https://bnb-mainnet.g.alchemy.com/v2/${alchemyAPIKey}`,
            gasPrice: process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 20000000000,
            accounts: [
                process.env.DEPLOYER_PRIVATEKEY
            ]
        }
    },
    etherscan: {
        apiKey: {
            bsc: process.env.BSCSCAN_API_KEY
        }
    },
    mocha: { timeout: 12000000 },
    rpc: {
        host: "localhost",
        port: 8545
    },
    gasReporter: {
        enabled: (process.env.REPORT_GAS) ? true : false
    },
    tenderly: {
        // https://docs.tenderly.co/account/projects/account-project-slug
        project: process.env.TENDERLY_PROJECT,
        username: process.env.TENDERLY_USERNAME,
    }
};
