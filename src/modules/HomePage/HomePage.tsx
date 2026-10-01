import { useEffect, useState } from 'react';

import { getProducts } from '../../shared/api';
import type { Product } from '../../shared/types';

import Loader from '../../components/Loader';
import ProductsSlider from '../../components/ProductsSlider';

import PicturesSlider from './components/PicturesSlider';
import CategoryGrid from './components/CategoryGrid';

import styles from './HomePage.module.scss';

type Props = {
  navigate: (to: string) => void;
};

export default function HomePage({ navigate }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const brandNew = [...products].sort((a, b) => b.year - a.year).slice(0, 8);

  const hotPrices = [...products]
    .sort(
      (a, b) =>
        b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
    )
    .slice(0, 8);

  return (
    <div className={styles.page}>
      <h1 className="visuallyHidden">Product Catalog</h1>

      <PicturesSlider navigate={navigate} />

      {loading && <Loader />}

      {error && (
        <div>
          <p>Something went wrong.</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNew}
            navigate={navigate}
            showDiscount={false}
          />

          <CategoryGrid navigate={navigate} />

          <ProductsSlider
            title="Hot prices"
            products={hotPrices}
            navigate={navigate}
            showDiscount
          />
        </>
      )}
    </div>
  );
}
