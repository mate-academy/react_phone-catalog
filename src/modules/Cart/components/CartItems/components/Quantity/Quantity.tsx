import React, { useContext } from 'react';

import { CartContext } from '../../../../../../context/CartContext';
import { MinusSVG } from '../../../../../../svgs/MinusSVG';
import { PlusSVG } from '../../../../../../svgs/PlusSVG';
import styles from './Quantity.module.scss';

interface Props {
  counter: number;
  id: string;
}

export const Quantity: React.FC<Props> = React.memo(({ counter, id }) => {
  const { addItem, removeItem } = useContext(CartContext);

  const addHandler = () => addItem(id);
  const removeHandler = () => removeItem(id, false);

  const disabledCondition = counter === 1;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.sign}
        onClick={removeHandler}
        disabled={disabledCondition}
      >
        <MinusSVG />
      </button>
      {counter}
      <button className={styles.sign} onClick={addHandler}>
        <PlusSVG />
      </button>
    </div>
  );
});

Quantity.displayName = 'Quantity';
