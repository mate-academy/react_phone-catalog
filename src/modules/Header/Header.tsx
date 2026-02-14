/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';

import { MainContext } from '../../context/MainContext';
import { Nav } from '../Nav';
import { Control } from './components/Control';
import { HeaderLink } from './components/HeaderLink';
import { MobileControl } from './components/MobileControl';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { isMobile } = useContext(MainContext);

  return (
    <header className={styles.header}>
      <HeaderLink />
      <div className={styles.container}>{!isMobile && <Nav />}</div>
      {isMobile ? <MobileControl /> : <Control />}
    </header>
  );
};
