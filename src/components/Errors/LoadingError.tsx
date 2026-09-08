import { useContext } from 'react';
import styles from './Errors.module.scss';
import { ProductsContext } from '../../store/ProductsContext';

export const LoadingError = () => {
  const { reloadProducts } = useContext(ProductsContext);

  return (
    <div className={styles.error}>
      <p className={styles.error__text}>Failed to load products</p>
      <button className={styles.error__button} onClick={reloadProducts}>
        Reload
      </button>
    </div>
  );
};
