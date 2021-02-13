
import * as React from 'react';
import { RelayLib } from 'relay';

import ChainsList from 'components/ChainsList';
import { ChainMetadata } from 'utils/interfaces/chain-metadata';

const Home = () => {
  React.useEffect(() => {
    (async () => {
      const relay = new RelayLib();
      await relay.init();

      try {
        // TODO: could be `numberOfChains`
        const maxChainId = await relay.getMaxChainId();
        const chainGetters =
          Array<number>(maxChainId)
            .fill(0)
            .map((_, index) => relay.getChainAtPosition(index));
        const theChains = await Promise.all(chainGetters);
        setChains(theChains);

        // TODO: later
        // const blockHash = await relay.getBlocksForChainId(0, 0);
      } catch {
        console.error(
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
    </>
  );
};

export default Home;
