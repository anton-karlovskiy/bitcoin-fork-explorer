
import * as React from 'react';
import BlocksTree from 'components/BlocksTree';

import ChainsList from 'components/ChainsList';
import getRelayInstance from 'utils/helpers/get-relay-instance';
import ChainMetadata from 'utils/interfaces/chain-metadata';

const Home = () => {
  React.useEffect(() => {
    (async () => {
      try {
        // TODO: should show loading UX
        const relayInstance = await getRelayInstance();

        // TODO: could be `numberOfChains`
        const maxChainId = await relayInstance.getMaxChainId();
        const chainGetters =
          Array<number>(maxChainId)
            .fill(0)
            .map((_, index) => relayInstance.getChainAtPosition(index));
        const theChains = await Promise.all(chainGetters);
        setChains(theChains);

        // TODO: later
        // const blockHash = await relay.getBlocksForChainId(0, 0);
      } catch {
        // TODO: should integrate an error handler
        console.error(
          `[Home] ` +
          `Failed to connect to contract!` +
          `Please make sure your local hardhat node is running, ` +
          `and Metamask is connected to your localhost RPC (RPC URL: 'http://localhost:8545', chain ID: '31337').`
        );
      }
    })();
  }, []);

  const [chains, setChains] = React.useState<ChainMetadata[]>([]);

  return (
    <>
      <ChainsList chains={chains} />
      <BlocksTree chains={chains} />
    </>
  );
};

export default Home;
