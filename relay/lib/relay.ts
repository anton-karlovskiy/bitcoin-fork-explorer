import { Relay } from "../typechain/Relay";
import { ethers } from "hardhat";

// this remains constant if deployed on a fresh hardhat network
// (but will change if redeployed without restarting the network)
const localHardhatAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export class RelayLib {
  relay: Relay;

  async init(address = localHardhatAddress) {
    const Relay = await ethers.getContractFactory("Relay");
    this.relay = Relay.attach(address) as Relay;
  }

  async storeBlockHeader(
    block_height: number,
    block_hash: string,
    chain_id: number
  ) {
    return await this.relay.store_block_header(
      block_height,
      block_hash,
      chain_id
    );
  }

  async getChainAtPosition(position: number) {
    // to implement
  }

  async getBlocksForChainId(id: number, height: number) {
    // to implement
  }

  async getMaxChainId() {
    // to implement
  }
}
