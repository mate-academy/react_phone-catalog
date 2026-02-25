import { ProductIllustration } from '../ProductIllustration';
import { ProductInformation } from '../ProductInformation';
import styles from './Product.module.scss';

export const Product = () => {
  return (
    <div className={styles.product}>
      <ProductIllustration />

      <ProductInformation />
    </div>
  );
};
