import { Link } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';

import { useStateContext } from '../../hooks/useStateContext';

import { Nav } from '../Nav';
import { ActionLinks } from '../ActionLinks';

import logo from '../../assets/logo.svg';

import styles from './Header.module.scss';

export const Header = () => {
  const { setIsOpenWindow } = useStateContext();

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img
              src={logo}
              alt="Nice Gadgets"
              className={styles['header__logo-image']}
            />
          </Link>

          <Nav orientation="horizontal" />
        </div>

        <div className={styles.header__row}>
          <button
            className={styles['header__search-button']}
            onClick={() => setIsOpenWindow(true)}
          >
            <MdOutlineSearch className={styles['header__search-icon']} />
          </button>
          <ActionLinks />
        </div>
      </div>
    </header>
  );
};
