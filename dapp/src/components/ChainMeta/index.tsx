
import styles from './chain-meta.module.css';

interface Props {
  chainId?: number;
  startHeight?: number;
  currentHeight?: number;
  bestBlockHash?: string;
}

const ChainMeta = ({
  chainId,
  startHeight,
  currentHeight,
  bestBlockHash
}: Props) => {
  const lines = [
    {
      title: 'Chain ID:',
      value: chainId,
      condition: chainId !== undefined
    },
    {
      title: 'Start Height:',
      value: startHeight,
      condition: startHeight !== undefined
    },
    {
      title: 'Current Height:',
      value: currentHeight,
      condition: currentHeight !== undefined
    },
    {
      title: 'Best Block Hash:',
      value: bestBlockHash,
      condition: !!bestBlockHash
    }
  ];

  return (
    <ul className={styles['chain-meta']}>
      {lines.map(line => (
        <li
          key={line.title}
          className={styles['chain-meta-item']}>
          {line.condition && (
            <>
              <strong>{line.title}</strong>
              <span>{line.value}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChainMeta;
