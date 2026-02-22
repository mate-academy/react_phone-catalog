import ProductListSkeleton from '../ProductListSkeleton';
import styles from './ProductPageSkeleton.module.scss';

export const ProductPageSkeleton = () => (
  <>
    <div className="container">
      <div className={styles.post}>
        <div
          style={{ marginBottom: '24px', marginTop: '40px', width: '80px' }}
          className={styles.line}
        ></div>
        <div
          style={{ marginBottom: '8px', height: '40px' }}
          className={styles.line}
        ></div>
        <div className={styles.line} style={{ width: '80px' }}></div>
        <div className={styles.form} style={{ marginBottom: '40px' }}>
          <div className={styles.avatar}></div>
          <div className={styles.avatar}></div>
        </div>
      </div>
      <ProductListSkeleton />
    </div>
  </>
);

export default ProductPageSkeleton;
