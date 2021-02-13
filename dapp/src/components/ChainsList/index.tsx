
import clsx from 'clsx';

import LinkButton from 'components/LinkButton';
import {
  PAGES,
  URL_PARAMS
} from 'utils/constants/links';
import { ChainMetadata } from 'utils/interfaces/chain-metadata';
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

const ChainsList = ({ chains }: Props) => {
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
        </div>
      ))}
    </>
  );
};

export default ChainsList;
