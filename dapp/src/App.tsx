
import * as React from 'react';
import { RelayLib } from 'relay';

import Container from 'parts/Container';
import ChainsList from 'components/ChainsList';
// TODO: should not use SASS in react development
import './_general.scss';

interface IChainMetadata {
  chainId: number,
  startHeight: number,
  currentHeight: number,
  bestBlockHash: string
}

function App() {
  // TODO: read the chain elements from the lib (smart contract)
  // TODO: display the different block headers/forks

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
          'Failed to connect to contract! Please make sure your local hardhat node is running, and Metamask is connected to your localhost RPC (RPC URL: \'http://localhost:8545\', chain ID: \'31337\').'
        );
      }
    })();
  }, []);

  const [chains, setChains] = React.useState<IChainMetadata[]>([]);

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>
        Bitcoin Fork Explorer
      </h1>
      <ChainsList chains={chains} />
    </Container>
  );
}

export default App;
