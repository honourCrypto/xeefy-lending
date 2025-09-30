const hre = require("hardhat");

async function main() {
  const FHELending = await hre.ethers.getContractFactory("xeefy-lending");
  const contract = await FHELending.deploy();
  await contract.deployed();

  console.log("xeefy-lending deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
