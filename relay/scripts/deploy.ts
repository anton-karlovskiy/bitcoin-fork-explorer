import { run, ethers } from "hardhat";

async function main() {
  await run("compile");

  const Relay = await ethers.getContractFactory("Relay");
  const relay = await Relay.deploy();

  await relay.deployed();

  console.log("Relay deployed at:", relay.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
