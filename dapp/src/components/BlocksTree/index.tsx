
import * as React from 'react';
import Tree from 'react-d3-tree';

import getBlockHashes from 'utils/helpers/get-block-hashes';
import ChainMetadata from 'utils/interfaces/chain-metadata';

interface Props {
  chains: Array<ChainMetadata>;
}

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        blockHash: 'Production'
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            blockHash: 'Fabrication'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        },
        {
          name: 'Foreman',
          attributes: {
            blockHash: 'Assembly'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        }
      ]
    }
  ]
};

// TODO: should be a container not a component
const BlocksTree = ({ chains }: Props) => {
  React.useEffect(() => {
    (async () => {
      try {
        for (const chain of chains) {
          const chainId = chain.chainId;
          const startHeight = chain.startHeight;
          const currentHeight = chain.currentHeight;
          const blockHashes = await getBlockHashes(chainId, startHeight, currentHeight);
          console.log('***** blockHashes => ', blockHashes);
        }
      } catch (error) {
        console.error('[BlocksTree] error.message => ', error.message);
      }
    })();
  }, [chains]);

  return (
    <div
      id='treeWrapper'
      style={{
        height: 600
      }}>
      <Tree data={orgChart} />
    </div>
  );
};

export default BlocksTree;
