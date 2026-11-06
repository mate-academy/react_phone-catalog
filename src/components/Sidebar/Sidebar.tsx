import { Link } from 'react-router-dom';

import { useStateContext } from '../../hooks/useStateContext';

import { Nav } from '../Nav';
import { BurgerMenu } from '../BurgerMenu';

import logo from '../../assets/logo.svg';

import styles from './Sidebar.module.scss';
import { ActionLinks } from '../ActionLinks';

export const Sidebar = () => {
  const { isMenuOpen, setIsMenuOpen } = useStateContext();

  return (
    <div
      className={`${styles.sidebar} ${isMenuOpen ? styles['sidebar--active'] : ''}`}
    >
      <div className={styles.sidebar__inner}>
        <div className={styles['sidebar__top-bar']}>
          <Link to="/" className={styles.sidebar__logo}>
            <img
              src={logo}
              alt="Logo"
              className={styles['sidebar__logo-image']}
            />
          </Link>

          <BurgerMenu icon="cross" onClick={() => setIsMenuOpen(false)} />
        </div>

        <Nav orientation="vertical" />

        <ActionLinks actionState="sidebar" />
      </div>
    </div>
  );
};
