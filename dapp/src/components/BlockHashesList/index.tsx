
import clsx from 'clsx';

import styles from './block-hashes-list.module.css';

interface Props {
  blockHashes: string[];
  startHeight: number;
  focusHeight?: number;
}

const BlockHashesList = ({
  blockHashes,
  startHeight,
  focusHeight
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
    {blockHashes.map((blockHash, index) => {
      const height = startHeight + index;

      return (
        <li
          key={blockHash}
          className={clsx(
            styles['flex-container'],
            { [styles['highlight']]: height === focusHeight }
          )}>
          <div className={clsx(styles['height-item'], styles['height-value'])}>
            {height}
          </div>
          <span className={styles['ellipsis']}>{blockHash}</span>
        </li>
      );
    })}
  </ul>
);

export default BlockHashesList;
