import React from 'react';
import ContentLoader from 'react-content-loader';
import { Product } from '../../types/Product';
import styles from './LoaderProductCard.module.scss';

type Props = {
  products: Product[];
};

export const LoaderProductCard: React.FC<Props> = React.memo(({ products }) => {
  return (
    <div className={styles.loaderProductCard}>
      <div className={styles.content}>
        <div className={styles.list}>
          {products.map(product => (
            <div className={styles.item} key={product.id}>
              <ContentLoader
                speed={2}
                width={272}
                height={506}
                viewBox="0 0 272 506"
                backgroundColor="#e0e0e0"
                foregroundColor="#ecebeb"
              >
                <rect x="45" y="31" rx="2" ry="2" width="170" height="196" />
                <rect x="31" y="249" rx="0" ry="0" width="208" height="40" />
                <rect x="120" y="251" rx="0" ry="0" width="11" height="3" />
                <rect x="32" y="301" rx="0" ry="0" width="110" height="31" />
                <rect x="32" y="340" rx="0" ry="0" width="208" height="1" />
                <rect x="32" y="350" rx="0" ry="0" width="208" height="20" />
                <rect x="32" y="375" rx="0" ry="0" width="208" height="20" />
                <rect x="32" y="400" rx="0" ry="0" width="208" height="20" />
                <rect x="32" y="434" rx="0" ry="0" width="160" height="40" />
                <rect x="200" y="434" rx="0" ry="0" width="40" height="40" />
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

LoaderProductCard.displayName = 'LoaderProductCard';
