import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetailsContent.module.scss';

import { useProductDetails } from '../../../../hooks/useProductDetails';
import { SuggestedProducts } from '../SuggestedProducts';
import { useCrossFade } from '../../../../hooks/useCrossFade';
import { ProductView } from '../ProductView';

export const ProductDetailsContent: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { details, loading, error } = useProductDetails(productId);
  const { current, previous } = useCrossFade(details, 500);

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!current && !previous && loading) {
    return <div className={styles.containerProductDetailsPage}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.containerProductDetailsPage}>
        <div className={styles.fadeWrapper}>
          {previous && (
            <div className={styles.fadeLayerOld}>
              <ProductView
                details={previous}
                isLoading={false}
              />
            </div>
          )}

          {current && (
            <div className={styles.fadeLayerNew}>
              <ProductView
                details={current}
                isLoading={loading}
              />
            </div>
          )}
        </div>
      </div>
      {current?.category && <SuggestedProducts category={current.category} />}
    </>
  );
};
