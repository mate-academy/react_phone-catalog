import React, { useEffect, useState } from 'react';
import styles from './ProductsDetailsPage.module.scss';
import { NavigationItem } from '../../shared/layout/NavigationItem';
import { ProductInfo } from './components/ProductInfo';
import { ProductDescription } from './components/ProductDescription';
import { ProductsRecommendation } from './components/ProductsRecommendation';
import { useParams } from 'react-router-dom';
import { getProductByCategory } from '../../api/getProductByCategory';
import { Goods } from '../../types/Goods';
import { Loader } from '../../shared/layout/Loader';
import { ProductNotFound } from './components/ProductNotFound';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams();
  const [goods, setGoods] = useState<Goods[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getProductByCategory(category)
      .then(data => setGoods(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const findGoods = () => {
    return goods.find(product => product.id === productId);
  };

  const product = findGoods();

  return (
    <div className={styles['product-details']}>
      <div className={`${styles['product-details__container']} container`}>
        {loading && <Loader />}

        {hasError && <div className={''}>Something went wrong</div>}

        {!loading && !hasError && !product && <ProductNotFound />}

        {product && !hasError && !loading && (
          <>
            <NavigationItem />

            <ProductInfo product={product} />

            <ProductDescription
              product={product}
              description={product.description}
            />

            <ProductsRecommendation currentProductId={product.id} />
          </>
        )}
      </div>
    </div>
  );
};
