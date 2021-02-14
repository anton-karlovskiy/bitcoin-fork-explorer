
import clsx from 'clsx';

import styles from './block-hashes-list.module.css';

interface Props {
  blockHashes: string[];
  startHeight: number;
}

const BlockHashesList = ({
  blockHashes,
  startHeight
}: Props) => (
  <ul className={styles['block-hashes-list']}>
    <li className={styles['flex-container']}>
      <div className={clsx(styles['height-item'], styles['height-title'])}>
        <strong>
          Block Height
        </strong>
      </div>
      <strong>
        Block Hash
      </strong>
    </li>
    {blockHashes.map((blockHash, index) => (
      <li
        key={blockHash}
        className={styles['flex-container']}>
        <div className={clsx(styles['height-item'], styles['height-value'])}>
          {startHeight + index}
        </div>
        <span className={styles['ellipsis']}>{blockHash}</span>
      </li>
    ))}
  </ul>
);

export default BlockHashesList;
