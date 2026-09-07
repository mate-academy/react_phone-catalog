/* eslint-disable max-len */
import React, { useContext } from 'react';

import { CartContext } from '../../../../../../context/CartContext';
import { Cross } from '../../../../../Header/components/MobileControl/components/Icons/Cross';
import styles from './Delete.module.scss';

interface Props {
  id: string;
}

export const Delete: React.FC<Props> = ({ id }) => {
  const { removeItem } = useContext(CartContext);

  const deleteHandler = () => {
    removeItem(id, true);
  };

  return (
    <div className={styles.wrapper} onClick={deleteHandler}>
      <Cross />
    </div>
  );
};
