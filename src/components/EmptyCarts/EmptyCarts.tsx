import { FC } from 'react';
import styles from './EmptyCarts.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';

export const EmptyCarts: FC = () => {
  const { emptyCartUrl } = useIconSrc();

  return (
    <>
      <div className={styles.notFound}>
        Your cart is empty
        <img
          className={styles.notFoundImg}
          src={emptyCartUrl}
          alt="Carts was not found"
        />
      </div>
    </>
  );
};
