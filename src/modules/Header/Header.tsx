/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { MobileControl } from './components/MobileControl';
import { MainContext } from '../../context/MainContext';
import { Control } from './components/Control';
import { Nav } from '../Nav';
import { HeaderLink } from './components/HeaderLink';

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
