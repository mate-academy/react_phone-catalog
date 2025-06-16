import { PicturesSlider } from '../../components/PicturesSlider.tsx/index.js';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../../components/ProductsSlider/index.js';
import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product.js';
import { getAllProducts } from '../../../api/products.js';
import { ErrorMessage } from '../../../types/ErrorMessage.js';
import { Category } from '../../components/Category/Category.js';
import { useLoading } from '../../../Context/LoadingContext.js';
import { Loader } from '../../components/Loader/Loader.js';

type Props = {
  isLightMode: boolean;
};

export const HomePage: React.FC<Props> = ({ isLightMode }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [allProducts, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const years = allProducts.map((product: Product) => product.year);

  const lastYear = Math.max(...years);
  const newModels = allProducts.filter(
    (product: Product) => product.year === lastYear,
  );

  const hotPricesProducts = allProducts.filter(
    product => product.fullPrice - product.price > 120,
  );

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(products => {
        if (!products && products.length === 0) {
          setErrorMessage(ErrorMessage.No_product_on_server);
        } else {
          setProducts(products);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.Other_problems))
      .finally(() => stopLoading());
  }, []);

  return (
    <div className={styles.home__page}>
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <>
          <section className={styles.home__page__welcome}>
            <div>
              <h1 className={styles.home__page__title}>
                Welcome to Nice Gadgets store!
              </h1>
            </div>
            <PicturesSlider />
          </section>
          <section className={styles.home__page__brand}>
            <h2 className={`${styles.section__title} ${styles.brand__title}`}>
              Brand new models
            </h2>
            <ProductsSlider
              products={newModels}
              sortBy="year"
              isLightMode={isLightMode}
            />
          </section>
          <section className={styles.home__page__category}>
            <h2 className={styles.section__title}>Shop by category</h2>
            <Category products={allProducts} />
          </section>
          <section className={styles.home__page__hot}>
            <h2
              className={`${styles.section__title} ${styles.hot__price__title}`}
            >
              Hot prices
            </h2>
            <ProductsSlider
              products={hotPricesProducts}
              sortBy="fullPrice"
              isLightMode={isLightMode}
              showFullPrice={true}
            />
          </section>
        </>
      )}
    </div>
  );
};
