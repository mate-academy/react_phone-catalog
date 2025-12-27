import classNames from 'classnames';
import styles from './HomePage.module.scss';

import { MainSlider } from './components/MainSlider';
import { useFetch } from '../shared/hooks/useFetch';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/product.service';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Categories } from './components/Categories';
import { useMemo } from 'react';
import { filterProducts } from '@/utils/filterProducts';

export const HomePage = () => {
  const { data: products, loading } = useFetch<Product[]>(getProducts, {
    initialValue: [],
  });

  const newestProducts = useMemo(() => {
    return filterProducts(products, {
      yearRange: { from: 2020, to: 2025 },
    });
  }, [products]);

  const discountProducts = useMemo(() => {
    return filterProducts(products, { withDiscount: true });
  }, [products]);

  return (
    <div className={styles.homeContent}>
      <section>
        <div className="container">
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className={classNames(styles.sliderWrapper, 'container')}>
          <MainSlider />
        </div>
      </section>

      <section>
        <ProductsSlider
          products={newestProducts}
          title="Brand new models"
          isLoading={loading}
        />
      </section>

      <section>
        <Categories products={products} isLoading={loading} />
      </section>

      <section>
        <ProductsSlider
          products={discountProducts}
          title="Hot prices"
          isLoading={loading}
        />
      </section>
    </div>
  );
};
