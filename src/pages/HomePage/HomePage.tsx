import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';

import styles from './HomePage.module.scss';

import { Slider } from '../../components/Slider';
import { ProductSlider } from '../../components/ProductsSlider';
import { WentWrong } from '../../components/WentWrong';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const hotPriceProduct = useMemo(
    () =>
      products.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
    [products],
  );

  const [modelsCounter, setModelsCounter] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    setLoader(true);
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const counter = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    products.forEach(prod => {
      switch (prod.category) {
        case 'phones':
          counter.phones++;
          break;
        case 'tablets':
          counter.tablets++;
          break;
        case 'accessories':
          counter.accessories++;
          break;
      }
    });

    setModelsCounter(counter);
  }, [products]);

  return (
    <div className={styles.homePage}>
      {error ? (
        <WentWrong />
      ) : (
        <>
          <div className={styles.homePage__topContainer}>
            <h1 className={styles.homePage__title}>
              Welcome to Nice Gadgets store!
            </h1>
            <Slider />
          </div>
          <ProductSlider
            products={products}
            title="Brand new models"
            loader={loader}
          />
          <div className={styles.categories}>
            <h2 className={styles.categories__title}>Shop by category</h2>
            <div className={styles.categories__links}>
              <div className={styles.categories__item}>
                <Link
                  to="/phones"
                  className={classNames(
                    styles.categories__photos,
                    styles['categories__photos--phone'],
                  )}
                />
                <Link to="/phones">
                  <h4 className={styles.categories__name}>Mobile phones</h4>
                </Link>
                <span
                  className={styles.categories__count}
                >{`${modelsCounter.phones} models`}</span>
              </div>
              <div className={styles.categories__item}>
                <Link
                  to="/tablets"
                  className={classNames(
                    styles.categories__photos,
                    styles['categories__photos--tablet'],
                  )}
                />
                <Link to="/tablets">
                  <h4 className={styles.categories__name}>Tablets</h4>
                </Link>
                <span
                  className={styles.categories__count}
                >{`${modelsCounter.tablets} models`}</span>
              </div>
              <div className={styles.categories__item}>
                <Link
                  to="accessories"
                  className={classNames(
                    styles.categories__photos,
                    styles['categories__photos--accessories'],
                  )}
                />
                <Link to="accessories">
                  <h4 className={styles.categories__name}>Accessories</h4>
                </Link>
                <span
                  className={styles.categories__count}
                >{`${modelsCounter.accessories} models`}</span>
              </div>
            </div>
          </div>
          <ProductSlider
            products={hotPriceProduct}
            title="Hot prices"
            showSale={true}
            loader={loader}
          />
        </>
      )}
    </div>
  );
};
