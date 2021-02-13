
import { ReactComponent as BitcoinIcon } from 'assets/icons/bitcoin.svg';
import styles from './app-bar.module.css';

const AppBar = () => (
  <header className={styles['app-bar']}>
    <BitcoinIcon
      style={{
        marginRight: 8
      }}
      width={60}
      height={60} />
    <h1>
      Bitcoin Fork Explorer
    </h1>
  </header>
);

export default AppBar;
