import React from 'react';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ListOfTextLinks } from '../listOfTextLinks';
import { ListOfIconLinks } from '../listOfIconLinks';

type Props = {
  onClickMenu: () => void;
  menuIsOpen: boolean;
};

export const Header: React.FC<Props> = ({ onClickMenu, menuIsOpen }) => {
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.headerLogoLink}>
        <img
          className={styles.headerLogo}
          src="img/header-logo.png"
          alt="Nice gadgets logo"
        />
      </Link>

      <nav className={styles.nav}>
        <ListOfTextLinks direction={'row'} />
        <ListOfIconLinks parentComponent={'header'} />
      </nav>
      {menuIsOpen ? (
        <button
          className={`${styles.burgerMenuButton} ${styles.closeButton}`}
          onClick={onClickMenu}
        >
          <img
            className="icons "
            src={'img/icons/close.svg'}
            alt="close menu"
          />
        </button>
      ) : (
        <button className={styles.burgerMenuButton} onClick={onClickMenu}>
          <img
            className="icons "
            src={'img/icons/burger-menu.svg'}
            alt="menu icon"
          />
        </button>
      )}
    </header>
  );
};
