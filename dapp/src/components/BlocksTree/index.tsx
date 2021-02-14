
import * as React from 'react';
import Tree from 'react-d3-tree';

import getBlockHashes from 'utils/helpers/get-block-hashes';
import ChainMetadata from 'utils/interfaces/chain-metadata';
import './blocks-tree.css';

interface Props {
  chains: Array<ChainMetadata>;
}

interface ChainData extends ChainMetadata {
  blockHashes: string[];
}

interface TreeNode {
  name: string;
  attributes: {
    blockHash: string,
    chainId: string
  };
  children?: TreeNode[];
}

const defaultTreeNodeTemplate: TreeNode = Object.freeze({
  name: '',
  attributes: {
    blockHash: '',
    chainId: ''
  }
});

const addBlockHeaderInChain = (
  treeNode: TreeNode,
  height: number,
  chain: ChainData
) => {
  const chainCurrentHeight = chain.currentHeight;

  if (height < chainCurrentHeight) {
    if (!treeNode.children) {
      treeNode.children = [];
      treeNode.children.push({ ...defaultTreeNodeTemplate });
    }

    addBlockHeaderInChain(treeNode.children[0], height + 1, chain);
  }

  const chainBlockHashes = chain.blockHashes;
  const chainStartHeight = chain.startHeight;
  const chainId = chain.chainId;
  const fullBlockHash = chainBlockHashes[height - chainStartHeight];
  if (height === chainCurrentHeight) {
    // Best block
    treeNode.name = `Current Height: ${height.toString()}`;
    treeNode.attributes = {
      ...treeNode.attributes,
      blockHash: `${fullBlockHash.substring(0, 6)}...${fullBlockHash.substr(fullBlockHash.length - 4)}`
    };
  } else {
    // Non-best block
    treeNode.name = `height: ${height.toString()}`;
    treeNode.attributes = {
      ...treeNode.attributes,
      blockHash: `${fullBlockHash.substring(0, 6)}...`
    };
  }

  treeNode.attributes = {
    ...treeNode.attributes,
    chainId: chainId.toString()
  };
};

interface Point {
  x: number;
  y: number;
}

const INITIAL_POSITION: Point = Object.freeze({
  x: 60,
  y: 300
});

const BlocksTree = ({ chains }: Props) => {
  const [treeData, setTreeData] = React.useState<TreeNode>();

  React.useEffect(() => {
    (async () => {
      try {
        const theTreeData = { ...defaultTreeNodeTemplate };

        for (const chain of chains) {
          const chainId = chain.chainId;
          const startHeight = chain.startHeight;
          const currentHeight = chain.currentHeight;
          const blockHashes = await getBlockHashes(chainId, startHeight, currentHeight);

          // Create the initial start tree node of the main chain - root tree node
          let startTreeNode = theTreeData;

          // Find the start tree node of a fork chain
          if (chainId > 0) {
            interface NoTreeLeaf extends TreeNode {
              children: TreeNode[];
            }
            // Find the parent tree node of the start tree node in the main chain
            [...Array(startHeight - 1)].forEach(_ => {
              startTreeNode = (startTreeNode as NoTreeLeaf).children[0];
            });

            // Create the start tree node in the parent tree node
            (startTreeNode as NoTreeLeaf).children.push({ ...defaultTreeNodeTemplate });
            const childrenLength = (startTreeNode as NoTreeLeaf).children.length;
            startTreeNode = (startTreeNode as NoTreeLeaf).children[childrenLength - 1];
          }

          // Populate block headers in the chain
          const chainData: ChainData = {
            chainId,
            startHeight,
            currentHeight,
            bestBlockHash: chain.bestBlockHash,
            blockHashes
          };
          addBlockHeaderInChain(startTreeNode, startHeight, chainData);
        }
        setTreeData(theTreeData);
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
      {treeData && (
        <Tree
          data={treeData}
          translate={{
            x: INITIAL_POSITION.x,
            y: INITIAL_POSITION.y
          }}
          rootNodeClassName='node__root'
          branchNodeClassName='node__branch'
          leafNodeClassName='node__leaf' />
      )}
    </div>
  );
};

export default BlocksTree;
