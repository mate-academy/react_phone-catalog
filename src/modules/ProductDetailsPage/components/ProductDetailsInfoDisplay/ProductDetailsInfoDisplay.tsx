import styles from './ProductDetailsInfoDisplay.module.scss';
import { useContext } from 'react';
import { ProductDetailsContext } from 'store/ProductDetailsContext';

type ProductDetailsInfoDisplayProps = {
  showCompleteDisplay?: boolean;
};

export const ProductDetailsInfoDisplay = ({
  showCompleteDisplay = false,
}: ProductDetailsInfoDisplayProps) => {
  const { product } = useContext(ProductDetailsContext);

  if (!product) {
    return;
  }

  const formatText = (content: string[]) => {
    const text = content.join(', ');

    return text;
  };

  return (
    <div className={styles.container}>
      {product.screen && (
        <div className={styles.container__info}>
          <span className={styles.container__info__title}>Screen</span>
          <span className={styles.container__info__value}>
            {product.screen}
          </span>
        </div>
      )}
      {product.resolution && (
        <div className={styles.container__info}>
          <span className={styles.container__info__title}>Resolution</span>
          <span className={styles.container__info__value}>
            {product.resolution}
          </span>
        </div>
      )}
      {product.processor && (
        <div className={styles.container__info}>
          <span className={styles.container__info__title}>Processor</span>
          <span className={styles.container__info__value}>
            {product.processor}
          </span>
        </div>
      )}
      {product.ram && (
        <div className={styles.container__info}>
          <span className={styles.container__info__title}>RAM</span>
          <span className={styles.container__info__value}>{product.ram}</span>
        </div>
      )}
      {showCompleteDisplay && (
        <>
          {product.camera && (
            <div className={styles.container__info}>
              <span className={styles.container__info__title}>Camera</span>
              <span className={styles.container__info__value}>
                {product.camera}
              </span>
            </div>
          )}
          {product.zoom && (
            <div className={styles.container__info}>
              <span className={styles.container__info__title}>Zoom</span>
              <span className={styles.container__info__value}>
                {product.zoom}
              </span>
            </div>
          )}
          {product.cell && (
            <div className={styles.container__info}>
              <span className={styles.container__info__title}>Cell</span>
              <span className={styles.container__info__value}>
                {formatText(product.cell)}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
