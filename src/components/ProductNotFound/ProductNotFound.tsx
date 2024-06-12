import { Link } from 'react-router-dom';
import styles from './ProductNotFound.module.css';

const ProductNotFound = () => {
  return (
    <>
      <div className={styles.not_found_container}>
        <h1 className={styles.not__found__title}>Product not found</h1>
        <Link to="/" className={styles.not__found__link}>
          Go to Homepage
        </Link>
      </div>
    </>
  );
};

export default ProductNotFound;
