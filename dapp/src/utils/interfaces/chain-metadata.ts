
interface ChainMetadata {
  chainId: number;
  startHeight: number;
  currentHeight: number;
  bestBlockHash: string;
}

export default ChainMetadata;
