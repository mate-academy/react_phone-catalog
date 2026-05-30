import React, { useContext } from 'react';

import { MainContext } from '../../../../context/MainContext';
import { Burger } from './components/Icons/Burger';
import { Cross } from './components/Icons/Cross';
import styles from './MobileControl.module.scss';

export const MobileControl: React.FC = () => {
  const { isMenuShowed } = useContext(MainContext);
  const { setIsMenuShowed } = useContext(MainContext);

  const onClickHandler = () => {
    if (isMenuShowed) {
      setIsMenuShowed(false);

      return;
    }

    setIsMenuShowed(true);
  };

  return (
    <div className={styles['menu-control']} onClick={onClickHandler}>
      {isMenuShowed ? <Cross /> : <Burger />}
    </div>
  );
};
