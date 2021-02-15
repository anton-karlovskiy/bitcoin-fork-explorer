
import clsx from 'clsx';

import LinkButton from 'components/LinkButton';
import {
  PAGES,
  URL_PARAMS
} from 'utils/constants/links';
import ChainMetadata from 'utils/interfaces/chain-metadata';
import styles from './chains-list.module.css';

const queryString = require('query-string');

interface Props {
  chains: Array<ChainMetadata>;
}

const TITLES = [
  'Chain ID',
  'Start height',
  'Current height',
  'Best block hash',
  'Details'
];

const HASH_INDEX = 3;

const ChainsList = ({ chains }: Props) => (
  <ul>
    <li className={styles['flex-container']}>
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
    </li>
    {chains.map(chain => (
      <li
        key={chain.chainId}
        className={styles['flex-container']}>
        <span
          className={styles['flex-item']}>
          {chain.chainId} {chain.chainId === 0 ? '(main)' : '(fork)'}
        </span>
        <span
          className={styles['flex-item']}>
          {chain.startHeight}
        </span>
        <span
          className={styles['flex-item']}>
          {chain.currentHeight}
        </span>
        <span
          className={clsx(styles['flex-item'], styles['hash-item'])}>
          {chain.bestBlockHash}
        </span>
        <LinkButton
          linkProps={{
            to: {
              pathname: `${PAGES.CHAIN}/${chain.chainId}`,
              search: queryString.stringify({
                [URL_PARAMS.START_HEIGHT]: chain.startHeight,
                [URL_PARAMS.CURRENT_HEIGHT]: chain.currentHeight
              })
            }
          }}
          buttonProps={{
            className: styles['flex-item']
          }}>
          Explore
        </LinkButton>
      </li>
    ))}
  </ul>
);

export default ChainsList;
