import React, { useContext } from 'react';
import { Cross } from './components/Icons/Cross';
import { Burger } from './components/Icons/Burger';
import styles from './MobileControl.module.scss';
import { MainContext } from '../../../../context/MainContext';

export const MobileControl: React.FC = () => {
  const { isMenuShowed } = useContext(MainContext);

  return (
    <div className={styles['menu-control']}>
      {isMenuShowed ? <Cross /> : <Burger />}
    </div>
  );
};
