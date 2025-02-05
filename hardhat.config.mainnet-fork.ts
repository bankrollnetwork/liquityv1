import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import * as tenderly from "@tenderly/hardhat-tenderly";

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

if (!alchemyApiKey) {
  throw new Error("ALCHEMY_API_KEY is missing");
} else {
  console.log("ALCHEMY_API_KEY is set");
}

tenderly.setup({ automaticVerifications: true });

const config: HardhatUserConfig = {
  //solidity: "0.7.3",
  solidity: "0.8.19",
  networks: {
    hardhat: {
      //chainId: 1,
      chainId: 56,
      forking: {
        //url: `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
        url: `https://bnb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      },
      accounts: [
        {
          privateKey: "0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7",
          balance: "100000000000000000000000"
        }
      ],
      initialBaseFeePerGas: 0
    },
    virtual_bnb: {
      url: "https://virtual.binance.rpc.tenderly.co/b66f1b48-1e2f-48c8-bee7-d10dc8aa4982",
      chainId: 56,
      //currency: "VBNB"
    }
  },
  tenderly: {
    // https://docs.tenderly.co/account/projects/account-project-slug
    project: "project",
    username: "kudu",
  },
};

export default config;
