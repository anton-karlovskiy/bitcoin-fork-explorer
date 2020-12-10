import { run, ethers } from "hardhat";
import testChains from "./testData";

async function main() {
  await run("compile");

  const Relay = await ethers.getContractFactory("Relay");
  const relay = await Relay.deploy();

  await relay.deployed();

  for (let i = 0; i < testChains.length; i++) {
    for (let j = 0; j < testChains[i].blocks.length; j++) {
      await relay.store_block_header(
        testChains[i].startBlock + j,
        testChains[i].blocks[j],
        i
      );
    }
  }

  console.log("Relay deployed at:", relay.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
