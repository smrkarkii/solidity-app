require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      chainId: 5,
      url: "https://eth-goerli.g.alchemy.com/v2/EjzE7CGBLaTC9tAaGUs-nHpHFGsP8xwL",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
