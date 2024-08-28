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
  const categoryPhones = `${process.env.PUBLIC_URL}/img/category-phones.webp`;
  const categoryTablets = `${process.env.PUBLIC_URL}/img/category-tablets.webp`;
  const categoryAccessories = `${process.env.PUBLIC_URL}/img/category-accessories.webp`;

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
      <div className={styles.homeWrapper}>
        <h1 hidden>Product Catalog</h1>
        <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>
        <PicturesSlider/>
      </div>
      <div className={styles.newModelsContainer}>
        <h2 className={styles.newModelsTitle}>Brand new models</h2>
        <ProductSlider goods={brandNewGoods} isLoading={isLoading} />
      </div>
      <div className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Shop by category</h2>
        <div className={styles.categoryGrid}>
          <NavLink className={styles.categoryLink} to="/phones">
            <div className={styles.categoryItem}>
              <img
                className={styles.categoryImage}
                src={categoryPhones}
                alt="phones"
              />
              <p className={styles.categoryName}>Mobile phones</p>
              <p className={styles.categoryCount}>{phonesAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="/tablets">
            <div className={styles.categoryItem}>
              <img
                className={styles.categoryImage}
                src={categoryTablets}
                alt="tablets"
              />
              <p className={styles.categoryName}>Tablets</p>
              <p className={styles.categoryCount}>
                {tabletsAmount} models
              </p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="accessories">
            <div className={styles.categoryItem}>
              <img
                className={styles.categoryImage}
                src={categoryAccessories}
                alt="accessories"
              />
              <p className={styles.categoryName}>Accessories</p>
              <p className={styles.categoryCount}>
                {accessoriesAmount} models
              </p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.hotDealsContainer}>
        <h2 className={styles.hotDealsTitle}>Hot prices</h2>
        <ProductSlider goods={hotPricesGoods} isLoading={isLoading} />
      </div>
    </>
  );
};

