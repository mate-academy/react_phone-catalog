import React, { useContext } from 'react';

import { MainContext } from '../../../../../../../../context/MainContext';
import { Button } from './components/Button';
import { Titles } from './components/Titles';
import styles from './Order.module.scss';

interface Props {
  imgIndex: number;
}

export const Order: React.FC<Props> = ({ imgIndex }) => {
  const { isDesktop } = useContext(MainContext);

  const IDENTATION = !isDesktop ? '10px' : '15px';

  return (
    <div
      className={styles.block}
      style={{
        transform: `translateY(-50%)`,
        left: !imgIndex ? IDENTATION : `calc(-100% - ${IDENTATION})`,
      }}
    >
      <Titles />
      <Button />
    </div>
  );
};
