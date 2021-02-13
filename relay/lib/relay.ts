import { Relay } from "../typechain/Relay";
import { Relay__factory } from "../typechain/factories/Relay__factory";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

// this remains constant if deployed on a fresh hardhat network
// (but will change if redeployed without restarting the network)
const localHardhatAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface ChainMetadata {
  chainId: number,
  startHeight: number,
  currentHeight: number,
  bestBlockHash: string
}

class RelayLib {
  relay: Relay | undefined;

  async init(address = localHardhatAddress) {
    const web3 = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(
      web3 as ethers.providers.ExternalProvider
    );
    await (provider.provider as any).enable();
    this.relay = Relay__factory.connect(address, provider) as Relay;
  }

  async storeBlockHeader(
    block_height: number,
    block_hash: string,
    chain_id: number
  ) {
    if (!this.relay) {
      throw new Error("Lib not initialised");
    }
    return await this.relay.store_block_header(
      block_height,
      block_hash,
      chain_id
    );
  }

  async getChainAtPosition(position: number): Promise<ChainMetadata> {
    if (!this.relay) {
      throw new Error("Lib not initialised");
    }

    const metadata = await this.relay.get_chain_at_position(position);

    return {
      chainId: metadata[0].toNumber(),
      startHeight: metadata[1].toNumber(),
      currentHeight: metadata[2].toNumber(),
      bestBlockHash: metadata[3]
    };
  }

  async getBlocksForChainId(id: number, height: number): Promise<string> {
    if (!this.relay) {
      throw new Error("Lib not initialised");
    }

    return await this.relay.get_blocks_for_chain_id(id, height);
  }

  // TODO: could be `getNumberOfChains`
  async getMaxChainId(): Promise<number> {
    if (!this.relay) {
      throw new Error("Lib not initialised");
    }

    return (await this.relay.get_max_chain_id()).toNumber();
  }
}

export {
  RelayLib
};
