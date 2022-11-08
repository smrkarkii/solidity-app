const { ethers } = require("hardhat");

async function main() {
  const AuctionFactory = await ethers.getContractFactory("Auction");
  console.log("Deploying contract ....");
  let contract = await AuctionFactory.deploy(
    100,
    "0x5b38da6a701c568545dcfcb03fcb875f56beddc4"
  );

  await contract.deployed();
  console.log(`deployeddd at ${contract.address}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
