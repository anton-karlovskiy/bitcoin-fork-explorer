
import * as React from 'react';
import Tree from 'react-d3-tree';

import getBlockHashes from 'utils/helpers/get-block-hashes';
import ChainMetadata from 'utils/interfaces/chain-metadata';

interface Props {
  chains: Array<ChainMetadata>;
}

// test touch <
interface ChainData extends ChainMetadata {
  blockHashes: string[]
}

interface TreeNode {
  name: string;
  attributes: {
    blockHash: string
  };
  children?: TreeNode[];
}
// test touch >

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

// test touch <
const addBlockHeader = (
  treeNode: TreeNode,
  height: number,
  chain: ChainData
) => {
  const chainCurrentHeight = chain.currentHeight;

  if (height < chainCurrentHeight) {
    if (!treeNode.children) {
      treeNode.children = [];
    }

    treeNode.children.push({
      name: '',
      attributes: {
        blockHash: ''
      }
    });
    const numberOfTreeNodeChildren = treeNode.children.length;

    addBlockHeader(treeNode.children[numberOfTreeNodeChildren - 1], height + 1, chain);
  }

  treeNode.name = height.toString();
  const blockHashes = chain.blockHashes;
  treeNode.attributes.blockHash = blockHashes[height];
};
// test touch >

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

          // test touch <
          const rootTreeNode = {
            name: '',
            attributes: {
              blockHash: ''
            }
          };
          const chainData = {
            chainId,
            startHeight,
            currentHeight,
            bestBlockHash: chain.bestBlockHash,
            blockHashes
          };
          addBlockHeader(rootTreeNode, 0, chainData);
          console.log('***** rootTreeNode => ', rootTreeNode);
          // test touch >
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
