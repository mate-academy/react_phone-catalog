import { Link } from 'react-router-dom';

import styles from './EmptyState.module.scss';

type Props = {
  category: string;
};

export const EmptyState: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.notFoundProducts}>
      <div className={styles.back}>
        <img src="img/icons/arrow-back.svg" alt="arrow-back" />
        <Link to="/">Back to home</Link>
      </div>
      <h1 className={styles.notFoundMessage}>There are no {category} yet.</h1>
      <img
        className={styles.notFoundProductsImage}
        src="img/product-not-found.png"
        alt="No products found"
      />
    </div>
  );
};
