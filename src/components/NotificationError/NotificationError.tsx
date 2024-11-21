import React, { useContext } from 'react';
import styles from './NotificationError.module.scss';
import { ProductsContext } from '../../store/ProductsContext';

type Props = {
  path: string;
};

export const NotificationError: React.FC<Props> = ({ path }) => {
  const { reloadProducts } = useContext(ProductsContext);

  return (
    <div className={styles.error}>
      <p className={styles.error__text}>There are no {path} yet</p>
      <button className={styles.error__button} onClick={reloadProducts}>
        Reload
      </button>
    </div>
  );
};
