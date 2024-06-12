import { Breadcrumbs } from '../shared/Breadcrumbs';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  return (
    <div className={styles.content}>
      <div className="container">
        <Breadcrumbs />
        <div>ProductDetailsPage</div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
