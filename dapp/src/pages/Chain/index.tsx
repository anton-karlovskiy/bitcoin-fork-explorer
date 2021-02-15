
import * as React from 'react';
import { useParams } from 'react-router-dom';

import ChainMeta from 'components/ChainMeta';
import BlockHashesList from 'components/BlockHashesList';
import useQuery from 'utils/hooks/use-query';
import getBlockHashes from 'utils/helpers/get-block-hashes';
import convertToNumber from 'utils/helpers/convert-to-number';
import { URL_PARAMS } from 'utils/constants/links';
import styles from './chain.module.css';

interface Params {
  id: string;
}

const checkInvalidNumberParam = (param: string): boolean => {
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
  const strFocusHeight: string | undefined = query.get(URL_PARAMS.FOCUS_HEIGHT) ?? undefined;

  const [blockHashes, setBlockHashes] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      if (!strChainId) return;
      if (!strStartHeight) return;
      if (!strCurrentHeight) return;

      if (checkInvalidNumberParam(strChainId)) {
        throw new Error('Invalid chain ID!');
      }
      const numericChainId = convertToNumber(strChainId);
      setChainId(numericChainId);

      if (checkInvalidNumberParam(strStartHeight)) {
        throw new Error('Invalid start height!');
      }
      const numericStartHeight = convertToNumber(strStartHeight);
      setStartHeight(numericStartHeight);

      if (checkInvalidNumberParam(strCurrentHeight)) {
        throw new Error('Invalid current height!');
      }
      const numericCurrentHeight = convertToNumber(strCurrentHeight);
      setCurrentHeight(numericCurrentHeight);

      (async () => {
        // test touch <
        // TODO: should add loading UX
        const theBlockHashes = await getBlockHashes(numericChainId, numericStartHeight, numericCurrentHeight);
        // test touch >
        setBlockHashes(theBlockHashes);
      })();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Chain] error.message => ', error.message);
    }
  }, [
    strChainId,
    strStartHeight,
    strCurrentHeight
  ]);

  const numericFocusHeight = convertToNumber(strFocusHeight);

  return (
    <div className={styles['chain']}>
      <ChainMeta
        chainId={chainId}
        startHeight={startHeight}
        currentHeight={currentHeight} />
      {startHeight !== undefined && (
        <BlockHashesList
          focusHeight={numericFocusHeight}
          blockHashes={blockHashes}
          startHeight={startHeight} />
      )}
    </div>
  );
};

export default Chain;
