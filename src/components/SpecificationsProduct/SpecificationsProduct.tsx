import styles from './SpecificationsProduct.module.scss';
import { Product } from '../../types/Product';
import { ProductDetail } from '../../types/ProductDetails';

type Props = {
  product?: Product,
  productDetail?: ProductDetail,
  showAll?: boolean,
};

export const SpecificationsProduct: React.FC<Props> = ({
  product,
  productDetail,
  showAll,
}) => {
  return (
    <div className="smallText">
      {product && (
        <>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Screen</p>
            <p>{product.screen}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Capacity</p>
            <p>{product.capacity}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>RAM</p>
            <p>{product.ram}</p>
          </div>
        </>
      )}

      {productDetail && !showAll && (
        <>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Screen</p>
            <p>{productDetail.screen}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Resolution</p>
            <p>{productDetail.resolution}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Processor</p>
            <p>{productDetail.capacity}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>RAM</p>
            <p>{productDetail.ram}</p>
          </div>
        </>
      )}

      {productDetail && showAll && (
        <>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Screen</p>
            <p>{productDetail.screen}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Resolution</p>
            <p>{productDetail.resolution}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Processor</p>
            <p>{productDetail.capacity}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>RAM</p>
            <p>{productDetail.ram}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Built in memory</p>
            <p>{productDetail.capacity}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Camera</p>
            <p>{productDetail.camera}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Zoom</p>
            <p>{productDetail.zoom}</p>
          </div>
          <div className={styles.specifications}>
            <p className={styles.specificationsName}>Cell</p>
            <p>{productDetail.cell}</p>
          </div>
        </>
      )}
    </div>
  );
};
