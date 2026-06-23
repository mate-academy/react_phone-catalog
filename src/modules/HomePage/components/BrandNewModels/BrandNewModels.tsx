import { useEffect, useState } from 'react';

import styles from './BrandNewModels.module.scss';
import { Product } from '../../../../shared/types/Product';
import { getProducts } from '../../../../api/products';
import { ProductSlider } from '../../../../shared/components/ProductSlider';
const title = 'Brand new models';

export const BrandNewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        const newProducts = data.sort((a, b) => b.year - a.year);

        setProducts(newProducts);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const isShowDiscount = false;

  if (error) {
    return 'error';
  }

  return (
    <div className={styles['brand-new-models']}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductSlider
          title={title}
          products={products}
          isShowDiscount={isShowDiscount}
        />
      )}
    </div>
  );
};
