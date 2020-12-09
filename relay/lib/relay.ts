import { Contract } from "ethers";
import { Relay } from "../typechain/Relay";
import { ethers } from "hardhat";
import { run, ethers } from "hardhat";

export class RelayLib {
  relay: Relay;

  async init(provider: Provider, address: string) {
    const Relay = await ethers.getContractFactory("Relay");
    this.relay = await Relay.attach(address);
  }

  // async store_block_header() {

  // }
}
