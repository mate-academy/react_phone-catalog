import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { Warning } from '../Warning';
import { Button } from '@components/Button';

import { clear } from '@features/cartSlice';
import { useAppDispatch } from '@store/hooks';

import styles from './Checkout.module.scss';

type Props = {
  className?: string;

  totalPrice: number;
  itemsCount: number;
};

export const Checkout: React.FC<Props> = ({
  className,

  totalPrice,
  itemsCount,
}) => {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClear = useCallback(() => {
    setIsWarningVisible(false);
    dispatch(clear());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    setIsWarningVisible(false);
  }, []);

  return (
    <article
      aria-label="Checkout"
      className={classNames(className, styles.checkout)}
    >
      <div className={styles.checkout__info}>
        <h2>${totalPrice}</h2>

        <div
          className={styles.checkout__count}
        >{`Total for ${itemsCount} item${itemsCount === 1 ? '' : 's'}`}</div>
      </div>

      <div className={styles.checkout__line}></div>

      <Button
        disabled={itemsCount === 0}
        className={styles.checkout__button}
        onClick={itemsCount ? () => setIsWarningVisible(true) : undefined}
      >
        Checkout
      </Button>

      {isWarningVisible && (
        <Warning onCancel={handleCancel} onConfirm={handleClear} />
      )}
    </article>
  );
};
