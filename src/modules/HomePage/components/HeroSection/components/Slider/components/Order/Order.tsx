import React, { useContext } from 'react';
import styles from './Order.module.scss';
import { MainContext } from '../../../../../../../../context/MainContext';
import { Titles } from './components/Titles';
import { Button } from './components/Button';

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
