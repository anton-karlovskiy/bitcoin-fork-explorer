
import { useParams } from 'react-router-dom';

interface Params {
  id: string
}

const Chain = () => {
  const params = useParams<Params>();

  return (
    <>Chain ID: {params.id}</>
  );
};

export default Chain;
