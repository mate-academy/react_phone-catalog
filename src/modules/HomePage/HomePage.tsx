import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/api/products';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { useLanguage } from '../shared/context/LanguageContext';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = useMemo(() => {
    return products
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const brandNew = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  const counts = useMemo(() => {
    return {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };
  }, [products]);

  return (
    <div className={styles.homePage}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <div className="main-container">
        <PicturesSlider />

        {loading ? (
          <Loader />
        ) : hasError ? (
          <p className="has-text-danger has-text-centered my-5">
            {t('somethingWentWrong')}
          </p>
        ) : (
          <>
            <ProductsSlider title={t('hotPrices')} products={hotPrices} />

            <ShopByCategory
              phonesCount={counts.phones}
              tabletsCount={counts.tablets}
              accessoriesCount={counts.accessories}
            />

            <ProductsSlider title={t('brandNew')} products={brandNew} />
          </>
        )}
      </div>
    </div>
  );
};
