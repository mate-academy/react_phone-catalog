import styles from './ProductSpecs.module.scss';
import { Product } from '../../../../types/Product';

type ProductSpecsProps = {
  product: Product;
};

export const ProductSpecs = ({ product }: ProductSpecsProps) => {
  return (
    <section className={styles.product_specs}>
      <div className={styles.product_specs__container}>
        <p className={styles.product_specs__container__title}>Screen</p>
        <p className={styles.product_specs__container__text}>
          {product.screen}
        </p>
      </div>

      <div className={styles.product_specs__container}>
        <p className={styles.product_specs__container__title}>Resolution</p>
        <p className={styles.product_specs__container__text}>
          {product.resolution}
        </p>
      </div>

      <div className={styles.product_specs__container}>
        <p className={styles.product_specs__container__title}>Processor</p>
        <p className={styles.product_specs__container__text}>
          {product.processor}
        </p>
      </div>

      <div className={styles.product_specs__container}>
        <p className={styles.product_specs__container__title}>RAM</p>
        <p className={styles.product_specs__container__text}>{product.ram}</p>
      </div>
    </section>
  );
};
