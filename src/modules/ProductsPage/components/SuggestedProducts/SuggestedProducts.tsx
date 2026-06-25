import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/ProductTypes/Product';
import styles from './SuggestedProducts.module.scss';

type Props = {
  products: Product[];
};

const SuggestedProducts: React.FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={styles.alsoLikeSection}>
      <h2>You may also like</h2>

      <div className={styles.suggestedProductsGrid}>
        {products.map(p => (
          <Link
            key={p.id}
            to={`/product/${p.itemId}`}
            className={styles.suggestedProductCard}
          >
            {p.image && (
              <img
                src={`/${p.image}`}
                alt={p.name}
                className={styles.suggestedProductImage}
              />
            )}

            <p className={styles.suggestedProductName}>{p.name}</p>

            <p className={styles.suggestedProductPrice}>
              ${p.priceDiscount ?? p.fullPrice ?? 'N/A'}
            </p>

            <div className={styles.suggestedProductSpecs}>
              <div>
                <span>Screen</span>
                <span>{p.screen}</span>
              </div>
              <div>
                <span>Capacity</span>
                <span>{p.capacity}</span>
              </div>
              <div>
                <span>RAM</span>
                <span>{p.ram}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
