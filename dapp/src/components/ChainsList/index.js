
import clsx from 'clsx';

import styles from './chains-list.module.css';

const TITLES = [
  'Chain ID',
  'Current height',
  'Start height',
  'Best block hash',
  'Details'
];

const HASH_INDEX = 3;

const ChainsList = ({ chains }) => {
  return (
    <>
      <div className={styles['flex-container']}>
        {TITLES.map((title, index) => (
          <span
            key={title}
            className={clsx(
              styles['flex-item'],
              styles['title-item'],
              { [styles['hash-item']]: index === HASH_INDEX }
            )}>
            {title}
          </span>
        ))}
      </div>
      {chains.map(chain => (
        <div
          key={chain.chainId}
          className={styles['flex-container']}>
          {Object.values(chain).map((value, index) => (
            <span
              key={index}
              className={clsx(
                styles['flex-item'],
                { [styles['hash-item']]: index === HASH_INDEX }
              )}>
              {value}
            </span>
          ))}
          <button className={styles['flex-item']}>
            Explore
          </button>
        </div>
      ))}
    </>
  );
};

export default ChainsList;
