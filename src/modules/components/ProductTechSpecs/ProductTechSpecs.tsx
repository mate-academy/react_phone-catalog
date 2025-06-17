import { ProductData } from '@models/ProductData';
import styles from './ProductTechSpecs.module.scss';

type Props = {
  product: ProductData | null;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  const cell = product?.cell.join(', ');

  return (
    <div className={styles.tech__specs}>
      <h2 className={styles.tech__specs__title}>Tech specs</h2>
      <div className={styles.tech__specs__box}>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>Screen</h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.screen}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>Resolution</h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.resolution}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>RAM</h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.ram}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>
            Built in memory
          </h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.capacity}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>Camera</h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.camera}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>Zoom</h4>
          <span className={styles['tech__specs__item--text']}>
            {product?.zoom}
          </span>
        </div>
        <div className={styles.tech__specs__item}>
          <h4 className={styles['tech__specs__item--title']}>Cell</h4>
          <span className={styles['tech__specs__item--text']}>{cell}</span>
        </div>
      </div>
    </div>
  );
};
