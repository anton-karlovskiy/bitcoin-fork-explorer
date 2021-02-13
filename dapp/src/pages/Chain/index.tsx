
import React from 'react';
import { useParams } from 'react-router-dom';

import useQuery from 'utils/hooks/use-query';
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

  React.useEffect(() => {
    try {
      if (!params) return;
      if (!query) return;

      const theChainId: string = params.id ?? '';
      if (checkInvalidParam(theChainId)) {
        throw new Error('Invalid chain ID!');
      } else {
        setChainId(Number(theChainId));
      }

      const theStartHeight: string = query.get(URL_PARAMS.START_HEIGHT) ?? '';
      if (checkInvalidParam(theStartHeight)) {
        throw new Error('Invalid start height!');
      } else {
        setStartHeight(Number(theStartHeight));
      }

      const theCurrentHeight: string = query.get(URL_PARAMS.CURRENT_HEIGHT) ?? '';
      if (checkInvalidParam(theCurrentHeight)) {
        throw new Error('Invalid current height!');
      } else {
        setCurrentHeight(Number(theCurrentHeight));
      }
    } catch (error) {
      console.error('[Chain] error.message => ', error.message);
    }
  }, [
    params,
    query
  ]);

  return (
    <>
      <div>Chain ID: {chainId}</div>
      <div>Start Height: {startHeight}</div>
      <div>Current Height: {currentHeight}</div>
    </>
  );
};

export default Chain;
