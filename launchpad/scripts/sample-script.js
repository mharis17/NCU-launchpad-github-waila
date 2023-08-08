// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Deploy  PublicsaleLaunchpadToken
   
    const PublicsaleLaunchpadToken= await hre.ethers.getContractFactory("PublicsaleLaunchpadToken");
    const Public = await PublicsaleLaunchpadToken.deploy();
    await Public.deployed();
    console.log("publicSale address",Public.address);

 // Deploy PresaleLaunchpadToken
   const PresaleLaunchpadToken= await hre.ethers.getContractFactory("PresaleLaunchpadToken");
   const presale = await PresaleLaunchpadToken.deploy();
   await presale.deployed();
   console.log("presale address",presale.address);

  // We get the contract to deploy
  const NCU_Launchpad= await hre.ethers.getContractFactory("NCU_Launchpad");
  const ncu = await NCU_Launchpad.deploy();
  await ncu.deployed();


 console.log("NCU  deployed to:",ncu.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
