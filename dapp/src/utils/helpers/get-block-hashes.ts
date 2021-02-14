
import getRelayInstance from 'utils/helpers/get-relay-instance';
import getNumberOfBlocks from 'utils/helpers/get-number-of-blocks';

const getBlockHashes = async (chainId: number, startHeight: number, currentHeight: number): Promise<string[]> => {
  const relayInstance = await getRelayInstance();
  const numberOfBlocks = getNumberOfBlocks(startHeight, currentHeight);
  const blockHashGetters =
    Array<number>(numberOfBlocks)
      .fill(0)
      .map((_, index) => relayInstance.getBlocksForChainId(chainId, index + startHeight));
  const blockHashes = await Promise.all(blockHashGetters);

  return blockHashes;
};

export default getBlockHashes;
