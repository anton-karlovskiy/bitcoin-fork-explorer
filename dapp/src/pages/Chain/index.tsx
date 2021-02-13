
import React from 'react';
import { useParams } from 'react-router-dom';
import { RelayLib } from 'relay';

import useQuery from 'utils/hooks/use-query';
import convertToNumber from 'utils/helpers/convert-to-number';
import { URL_PARAMS } from 'utils/constants/links';

interface Params {
  id: string
}

const checkInvalidParam = (param: string): boolean => {
  return param === '' || isNaN(Number(param));
};

const Chain = () => {
  const params = useParams<Params>();
  const query: URLSearchParams = useQuery();

  const [chainId, setChainId] = React.useState<number>();
  const [startHeight, setStartHeight] = React.useState<number>();
  const [currentHeight, setCurrentHeight] = React.useState<number>();

  const strChainId: string = params.id ?? '';
  const strStartHeight: string = query.get(URL_PARAMS.START_HEIGHT) ?? '';
  const strCurrentHeight: string = query.get(URL_PARAMS.CURRENT_HEIGHT) ?? '';

  const [blocks, setBlocks] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      if (!strChainId) return;
      if (!strStartHeight) return;
      if (!strCurrentHeight) return;

      if (checkInvalidParam(strChainId)) {
        throw new Error('Invalid chain ID!');
      }
      const numericChainId = convertToNumber(strChainId);
      setChainId(numericChainId);

      if (checkInvalidParam(strStartHeight)) {
        throw new Error('Invalid start height!');
      }
      const numericStartHeight = convertToNumber(strStartHeight);
      setStartHeight(numericStartHeight);

      if (checkInvalidParam(strCurrentHeight)) {
        throw new Error('Invalid current height!');
      }
      const numericCurrentHeight = convertToNumber(strCurrentHeight);
      setCurrentHeight(numericCurrentHeight);

      (async () => {
        const relay = new RelayLib();
        await relay.init();

        const blocksLength = numericCurrentHeight - numericStartHeight + 1;
        const blockGetters =
          Array<number>(blocksLength)
            .fill(0)
            .map((_, index) => relay.getBlocksForChainId(numericChainId, index + numericStartHeight));
        const theBlocks = await Promise.all(blockGetters);
        setBlocks(theBlocks);
      })();
    } catch (error) {
      console.error('[Chain] error.message => ', error.message);
    }
  }, [
    strChainId,
    strStartHeight,
    strCurrentHeight
  ]);

  return (
    <>
      <div>Chain ID: {chainId}</div>
      <div>Start Height: {startHeight}</div>
      <div>Current Height: {currentHeight}</div>
      {blocks.map(block => (
        <div key={block}>{block}</div>
      ))}
    </>
  );
};

export default Chain;
