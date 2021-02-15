
import * as React from 'react';
import BlocksTree from 'components/BlocksTree';

import ChainsList from 'components/ChainsList';
import Loader from 'components/Loader';
import ErrorReport from 'components/ErrorReport';
import getRelayInstance from 'utils/helpers/get-relay-instance';
import ChainMetadata from 'utils/interfaces/chain-metadata';
import FETCHING_STATUSES from 'utils/constants/fetching-statuses';

const Home = () => {
  const [status, setStatus] = React.useState(FETCHING_STATUSES.IDLE);
  const [error, setError] = React.useState(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        setStatus(FETCHING_STATUSES.PENDING);
        const relayInstance = await getRelayInstance();
        const maxChainId = await relayInstance.getMaxChainId();
        const chainGetters =
          Array<number>(maxChainId)
            .fill(0)
            .map((_, index) => relayInstance.getChainAtPosition(index));
        const theChains = await Promise.all(chainGetters);
        setStatus(FETCHING_STATUSES.RESOLVED);

        // Sort the chains according to their `current_height`
        const mainChain = [...theChains].shift();
        const forkChains = theChains.slice(1, theChains.length);
        forkChains.sort(function (a, b) {
          return b.currentHeight - a.currentHeight;
        });
        const sortedChains = [
          mainChain,
          ...forkChains
        ];

        setChains(sortedChains);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `[Home] ` +
          `Failed to connect to contract!` +
          `Please make sure your local hardhat node is running, ` +
          `and Metamask is connected to your localhost RPC (RPC URL: 'http://localhost:8545', chain ID: '31337').`
        );
        setStatus(FETCHING_STATUSES.REJECTED);
        setError(error);
      }
    })();
  }, []);

  const [chains, setChains] = React.useState<ChainMetadata[]>([]);

  if (status === FETCHING_STATUSES.IDLE || status === FETCHING_STATUSES.PENDING) {
    return <Loader centerViewport />;
  }

  if (status === FETCHING_STATUSES.REJECTED) {
    return <ErrorReport error={error} />;
  }

  if (status === FETCHING_STATUSES.RESOLVED) {
    return (
      <>
        <ChainsList chains={chains} />
        <BlocksTree chains={chains} />
      </>
    );
  }

  return null;
};

export default Home;
