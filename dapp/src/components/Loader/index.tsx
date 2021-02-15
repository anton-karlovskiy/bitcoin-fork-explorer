
import clsx from 'clsx';

import styles from './loader.module.css';

interface Props {
  className?: string;
  centerViewport?: boolean;
  centerRow?: boolean;
}

const Loader = ({
  className,
  centerViewport,
  centerRow
}: Props) => (
  <div
    className={clsx(
      styles['loader'],
      { [styles['center-viewport']]: centerViewport },
      { [styles['center-row']]: centerRow },
      className
    )}>
    <div className={styles['loading']} />
  </div>
);

export default Loader;
