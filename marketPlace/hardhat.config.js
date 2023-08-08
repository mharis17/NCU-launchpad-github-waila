require("@nomiclabs/hardhat-waffle");
// require("hardhat-gas-reporter");
// require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gas: 12000000,
      // blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.4.26",
      },
      {
        version: "0.8.4",
        settings: {optimizer: {
          enabled: true,
          runs: 200
        }},
      },
    ],
  },
  gasReporter:{
    enabled:true,
    currency:"PKR",
    coinmarketcap: process.env.coinMarketCap_API
  }

}



