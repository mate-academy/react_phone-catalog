import React from 'react';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ListOfTextLinks } from '../ListOfTextLinks';
import { ListOfIconLinks } from '../ListOfIconLinks';
import classNames from 'classnames';

export const Header: React.FC = () => {
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
        <ListOfTextLinks />
        <ListOfIconLinks />

        <button className={classNames(styles.burgerMenuButton)}>
          <img
            className="icons "
            src="img/icons/burger-menu.svg"
            alt="menu icon"
          />
        </button>
      </nav>
    </header>
  );
};
