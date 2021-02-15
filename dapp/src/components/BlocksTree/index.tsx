
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Tree from 'react-d3-tree';

import Loader from 'components/Loader';
import ErrorReport from 'components/ErrorReport';
import getBlockHashes from 'utils/helpers/get-block-hashes';
import ChainMetadata from 'utils/interfaces/chain-metadata';
import {
  PAGES,
  URL_PARAMS
} from 'utils/constants/links';
import FETCHING_STATUSES from 'utils/constants/fetching-statuses';
import './blocks-tree.css';

const queryString = require('query-string');

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

const SEPARATOR = ': ';

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
    treeNode.name = `Current Height${SEPARATOR}${height.toString()}`;
    treeNode.attributes = {
      ...treeNode.attributes,
      blockHash: `${fullBlockHash.substring(0, 6)}...${fullBlockHash.substr(fullBlockHash.length - 4)}`
    };
  } else {
    // Non-best block
    treeNode.name = `height${SEPARATOR}${height.toString()}`;
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
  const [status, setStatus] = React.useState(FETCHING_STATUSES.IDLE);
  const [error, setError] = React.useState(undefined);

  const history = useHistory();

  const [treeData, setTreeData] = React.useState<TreeNode>();

  React.useEffect(() => {
    (async () => {
      try {
        const theTreeData = { ...defaultTreeNodeTemplate };

        const allBlockHashGetters =
          Array<number>(chains.length)
            .fill(0)
            .map((_, index) =>
              getBlockHashes(
                chains[index].chainId,
                chains[index].startHeight,
                chains[index].currentHeight
              ));
        setStatus(FETCHING_STATUSES.PENDING);
        const allBlockHashes = await Promise.all(allBlockHashGetters);
        setStatus(FETCHING_STATUSES.RESOLVED);

        let index = 0;
        for (const chain of chains) {
          const chainId = chain.chainId;
          const startHeight = chain.startHeight;
          const currentHeight = chain.currentHeight;

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
            blockHashes: allBlockHashes[index++]
          };
          addBlockHeaderInChain(startTreeNode, startHeight, chainData);
        }
        setTreeData(theTreeData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[BlocksTree] error.message => ', error.message);
        setStatus(FETCHING_STATUSES.REJECTED);
        setError(error);
      }
    })();
  }, [chains]);

  const handleTreeNodeClick = (...args: any) => {
    const treeNode: TreeNode = args[0];
    const chainId = Number(treeNode.attributes.chainId);
    const blockHeight = treeNode.name.split(SEPARATOR)[1];
    const clickedChain = chains.find(chain => chain.chainId === chainId);
    if (!clickedChain) {
      throw new Error('Invalid chain clicked!');
    }
    const chainStartHeight = clickedChain.startHeight;
    const chainCurrentHeight = clickedChain.currentHeight;
    history.push({
      pathname: `${PAGES.CHAIN}/${chainId}`,
      search: queryString.stringify({
        [URL_PARAMS.START_HEIGHT]: chainStartHeight,
        [URL_PARAMS.CURRENT_HEIGHT]: chainCurrentHeight,
        [URL_PARAMS.FOCUS_HEIGHT]: blockHeight
      })
    });
  };

  if (status === FETCHING_STATUSES.IDLE || status === FETCHING_STATUSES.PENDING) {
    return <Loader />;
  }

  if (status === FETCHING_STATUSES.REJECTED) {
    return <ErrorReport error={error} />;
  }

  if (status === FETCHING_STATUSES.RESOLVED) {
    return (
      <div
        id='treeWrapper'
        style={{
          height: 600
        }}>
        {treeData && (
          <Tree
            data={treeData}
            translate={INITIAL_POSITION}
            rootNodeClassName='node__root'
            branchNodeClassName='node__branch'
            leafNodeClassName='node__leaf'
            collapsible={false}
            onNodeClick={handleTreeNodeClick} />
        )}
      </div>
    );
  }

  return null;
};

export default BlocksTree;
