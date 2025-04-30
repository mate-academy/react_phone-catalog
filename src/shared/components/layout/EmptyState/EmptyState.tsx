import { Link } from 'react-router-dom';

import arrowBack from 'assets/img/icons/arrow-back-white.svg';
import notFoundImg from 'assets/img/ui/product-not-found.png';

import styles from './EmptyState.module.scss';

type Props = {
  category: string;
};

export const EmptyState: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.notFoundProducts}>
      <div className={styles.back}>
        <img alt="arrow-back" src={arrowBack} />
        <Link to="/">Back to home</Link>
      </div>
      <h1 className={styles.notFoundMessage}>There are no {category} yet.</h1>
      <img
        alt="No products found"
        className={styles.notFoundProductsImage}
        src={notFoundImg}
      />
    </div>
  );
};
