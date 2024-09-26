import { FC } from 'react';
import { Category } from '../../../../types/Category';
import styles from './Error.module.scss';
import { Product } from '../../../../types/Product';

interface ErrorProps {
  category: Category;
  reload: () => void;
  products: Product[];
}

export const Error: FC<ErrorProps> = ({ category, reload }) => {
  return (
    <div className={styles.errorWrapper}>
      <h2 className={styles.title}>{`There are no ${category} yet`}</h2>
      <button className={styles.btn} onClick={reload}>
        <p className={styles.buttonText}>Reload</p>
      </button>
    </div>
  );
};
