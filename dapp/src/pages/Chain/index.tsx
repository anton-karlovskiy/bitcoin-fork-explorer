
import { useParams } from 'react-router-dom';

import useQuery from 'utils/hooks/use-query';
import { URL_PARAMS } from 'utils/constants/links';

interface Params {
  id: string
}

const Chain = () => {
  const params = useParams<Params>();
  const query: URLSearchParams = useQuery();

  return (
    <>
      <div>Chain ID: {params.id}</div>
      <div>Start Height: {query.get(URL_PARAMS.START_HEIGHT)}</div>
      <div>Current Height: {query.get(URL_PARAMS.CURRENT_HEIGHT)}</div>
    </>
  );
};

export default Chain;
