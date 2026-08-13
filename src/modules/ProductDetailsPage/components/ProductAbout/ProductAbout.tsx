import styles from './ProductAbout.module.scss';

import { Product } from '../../../../shared/types/Product/Product';

type Props = {
  productInfo: Product;
};

export const ProductAbout: React.FC<Props> = ({ productInfo }) => {
  return (
    <div className={styles.productInfo__about}>
      <h3 className={styles.productInfo__title}>About</h3>
      <hr className={styles.productInfo__line} />
      {productInfo.description.map(productDescription => (
        <article
          className={styles.productInfo__article}
          key={productDescription.title}
        >
          <h4 className={styles.productInfo__articleTitle}>
            {productDescription.title}
          </h4>
          <p className={styles.productInfo__description}>
            {productDescription.text}
          </p>
        </article>
      ))}
    </div>
  );
};
