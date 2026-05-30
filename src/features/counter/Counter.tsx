import React, { useState } from 'react';

import styles from './Counter.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncrementAmount(+event.target.value);
  };

  return (
    <div>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>

        <span className={styles.value}>{count}</span>

        <button
          type="button"
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={handleAmountChange}
        />

        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Add Amount
        </button>

        <button
          type="button"
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementAmount))}
        >
          Add Async
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementAmount))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
