import React, { useEffect, useContext, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsContext } from '../../context/ProductsContext';
import { fetchProducts } from '../../servises/products';
import { ProductSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/types';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { goods, updateGoods } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(false);
  const categoryPhones = `${process.env.PUBLIC_URL}/img/category-phones.png`;
  const categoryTablets = `${process.env.PUBLIC_URL}/img/category-tablets.png`;
  const categoryAccessories = `${process.env.PUBLIC_URL}/img/category-accessories.png`;

  useEffect(() => {
    if (!goods || !goods.length) {
      setIsLoading(true);

      fetchProducts()
        .then(data => updateGoods(data as Product[]))
        .catch(() => {
          throw new Error();
        })
        .finally(() => setIsLoading(false));
    }
  }, [goods, updateGoods]);

  const brandNewGoods = useMemo(
    () =>
      goods
        ? [...goods]
            .sort((a, b) => b.fullPrice - a.fullPrice)
            .map(good => ({ ...good, fullPrice: 0 }))
        : [],
    [goods],
  );

  const hotPricesGoods = useMemo(
    () => (goods ? [...goods].sort((a, b) => b.price - a.price) : []),
    [goods],
  );

  const phonesAmount = useMemo(
    () => (goods ? goods.filter(good => good.category === 'phones').length : null),
    [goods],
  );

  const tabletsAmount = useMemo(
    () => (goods ? goods.filter(good => good.category === 'tablets').length : null),
    [goods],
  );

  const accessoriesAmount = useMemo(
    () => (goods ? goods.filter(good => good.category === 'accessories').length : null),
    [goods],
  );

  return (
    <>
      <div className={styles.homepage}>
        <h1 hidden>Product Catalog</h1>
        <h2 className={styles.homepage__title}>Welcome to Nice Gadgets store!</h2>
        <PicturesSlider />
      </div>
      <section className={styles.homepage__newProducts}>
        <h2 className={styles.homepage__newProductsTitle}>Brand new models</h2>
        <ProductSlider goods={brandNewGoods} isLoading={isLoading} />
      </section>
      <section className={styles.homepage__categories}>
        <h2 className={styles.homepage__categoriesTitle}>Shop by category</h2>
        <div className={styles.homepage__categoriesGrid}>
          <NavLink className={styles.category} to="/phones">
            <div className={styles.category__content}>
              <img className={styles.category__image} src={categoryPhones} alt="phones" />
              <p className={styles.category__title}>Mobile phones</p>
              <p className={styles.category__amount}>{phonesAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.category} to="/tablets">
            <div className={styles.category__content}>
              <img className={styles.category__image} src={categoryTablets} alt="tablets" />
              <p className={styles.category__title}>Tablets</p>
              <p className={styles.category__amount}>{tabletsAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.category} to="accessories">
            <div className={styles.category__content}>
              <img className={styles.category__image} src={categoryAccessories} alt="accessories" />
              <p className={styles.category__title}>Accessories</p>
              <p className={styles.category__amount}>{accessoriesAmount} models</p>
            </div>
          </NavLink>
        </div>
      </section>
      <section className={styles.homepage__hotPrices}>
        <h2 className={styles.homepage__hotPricesTitle}>Hot prices</h2>
        <ProductSlider goods={hotPricesGoods} isLoading={isLoading} />
      </section>
    </>
  );
};
