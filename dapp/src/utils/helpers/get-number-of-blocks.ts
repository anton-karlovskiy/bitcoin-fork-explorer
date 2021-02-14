
const getNumberOfBlocks = (startHeight: number, currentHeight: number): number => {
  if (startHeight < 0) {
    throw new Error('Invalid start height!');
  }

  if (startHeight > currentHeight) {
    throw new Error('Current height must be equal to or greater than start height!');
  }

  return currentHeight - startHeight + 1;
};

export default getNumberOfBlocks;
