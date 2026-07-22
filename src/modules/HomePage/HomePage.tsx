import { MainSlider } from './components/MainSlider';
import { Categories } from './components/Categories';
import styles from './HomePage.module.scss';
import '../../styles/_container.scss';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../services/product';
import { Product } from '../shared/types/Product';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import classNames from 'classnames';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);

      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 20);

  const hotPricesProducts = [...products]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 20);

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className="is-sr-only">Product Catalog</h1>

        <h2 className={classNames(styles.title, 'container')}>
          Welcome to Nice Gadgets store!
        </h2>

        <section className={styles.sliderWrapper}>
          <MainSlider />
        </section>
      </div>

      {isLoading && (
        <div className={classNames(styles.state, 'container')}>
          <span
            className={classNames('loader', styles.loader)}
            aria-hidden="true"
          />
        </div>
      )}

      {!isLoading && error && <ErrorMessage onRetry={loadProducts} />}

      {!isLoading && !error && (
        <div className={classNames(styles.content, 'container')}>
          <section>
            <ProductsSlider
              title="Brand new models"
              products={brandNewProducts}
              showDiscount={false}
            />
          </section>

          <Categories products={products} />

          <section>
            <ProductsSlider title="Hot prices" products={hotPricesProducts} />
          </section>
        </div>
      )}
    </div>
  );
};
