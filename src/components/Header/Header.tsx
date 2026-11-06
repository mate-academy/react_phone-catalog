import React from 'react';
import { Link } from 'react-router-dom';

import { Nav } from '../Nav';
import { ActionLinks } from '../ActionLinks';

import logo from '../../assets/logo.svg';

import styles from './Header.module.scss';

type Props = {};

export const Header: React.FC<Props> = () => {
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

        <ActionLinks />
      </div>
    </header>
  );
};
