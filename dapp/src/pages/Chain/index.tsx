
import * as React from 'react';
import { useParams } from 'react-router-dom';

import useQuery from 'utils/hooks/use-query';
import getBlockHashes from 'utils/helpers/get-block-hashes';
import convertToNumber from 'utils/helpers/convert-to-number';
import { URL_PARAMS } from 'utils/constants/links';
import ChainMeta from 'components/ChainMeta';

interface Params {
  id: string;
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

  const [blockHashes, setBlockHashes] = React.useState<string[]>([]);

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
        const theBlockHashes = await getBlockHashes(numericChainId, numericStartHeight, numericCurrentHeight);
        setBlockHashes(theBlockHashes);
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
      <ChainMeta
        chainId={chainId}
        startHeight={startHeight}
        currentHeight={currentHeight} />
      {/* TODO: could be `BlockHashesList` */}
      {blockHashes.map(blockHash => (
        <div key={blockHash}>{blockHash}</div>
      ))}
    </>
  );
};

export default Chain;
