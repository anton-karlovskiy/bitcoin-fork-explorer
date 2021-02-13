
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';
import { PAGES } from 'utils/constants/links';
import styles from './app-bar.module.css';

const AppBar = () => (
  <header className={styles['app-bar']}>
    <Link to={PAGES.HOME}>
      <Logo
        style={{
          marginRight: 8
        }}
        width={60}
        height={60} />
    </Link>
    <h1>
      Bitcoin Fork Explorer
    </h1>
  </header>
);

export default AppBar;
