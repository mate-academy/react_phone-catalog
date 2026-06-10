import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Banner } from '../Banner/Banner';

import { Product } from '../../Types/Product';
import productsData from '../../../public/api/products.json';
import { Loader } from '../../components/Loader/Loader';

const CARD_GAP = 16;

export const HomePage: React.FC = () => {
  const allProducts: Product[] = useMemo(() => {
    if (Array.isArray(productsData)) {
      return productsData as Product[];
    }

    const dataWithProducts = productsData as { products?: Product[] };

    if (dataWithProducts && Array.isArray(dataWithProducts.products)) {
      return dataWithProducts.products;
    }

    return [];
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { cardWidth, frameSize } = useMemo(() => {
    if (windowWidth < 640) {
      return { cardWidth: 288, frameSize: 1 };
    }

    if (windowWidth < 1200) {
      return { cardWidth: 287, frameSize: 2 };
    }

    return { cardWidth: 272, frameSize: 4 };
  }, [windowWidth]);

  const brandNewProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) =>
        b.year !== a.year ? b.year - a.year : b.fullPrice - a.fullPrice,
      )
      .slice(0, 10);
  }, [allProducts]);

  const hotProducts = useMemo(() => {
    return [...allProducts]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);
  }, [allProducts]);

  const categoryCounts = useMemo(
    () => ({
      phones: allProducts.filter(p => p.category === 'phones').length,
      tablets: allProducts.filter(p => p.category === 'tablets').length,
      accessories: allProducts.filter(p => p.category === 'accessories').length,
    }),
    [allProducts],
  );

  const [newArrivalsPos, setNewArrivalsPos] = useState(0);
  const [hotPricesPos, setHotPricesPos] = useState(0);

  const handleMove = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentPos: number,
    maxItems: number,
    direction: 'next' | 'prev',
  ) => {
    if (direction === 'next' && currentPos + frameSize < maxItems) {
      setter(prev => prev + 1);
    } else if (direction === 'prev' && currentPos > 0) {
      setter(prev => prev - 1);
    }
  };

  const getTransform = (pos: number) =>
    `translateX(-${pos * (cardWidth + CARD_GAP)}px)`;

  interface CategoryLinkProps {
    to: string;
    img: string;
    label: string;
    count: number;
  }

  const CategoryLink: React.FC<CategoryLinkProps> = ({
    to,
    img,
    label,
    count,
  }) => {
    const categoryClass = to.replace('/', '');
    const wrapperClass = `${styles.categoriesImageWrapper} ${styles[`categoriesImageWrapper${categoryClass.charAt(0).toUpperCase() + categoryClass.slice(1)}`] || ''}`;

    return (
      <Link to={to} className={styles.categoriesItem}>
        <div className={wrapperClass}>
          <img src={img} alt={label} className={styles.categoriesImage} />
        </div>
        <h4 className={styles.categoriesName}>{label}</h4>
        <p className={styles.categoriesCount}>{count} models</p>
      </Link>
    );
  };

  return (
    <div className={styles.homePage}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main className={styles.container}>
            <h1 className={styles.homePageTitle}>
              Welcome to Nice Gadgets store!
            </h1>

            <section className={styles.homePageBannerSection}>
              <Banner />
            </section>

            <section className={styles.homePageSection}>
              <div className={styles.homePageSectionHeader}>
                <h2 className={styles.homePageSectionTitle}>
                  Brand new models
                </h2>
                <div className={styles.homePageNavButtons}>
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navButtonLeft}`}
                    onClick={() =>
                      handleMove(
                        setNewArrivalsPos,
                        newArrivalsPos,
                        brandNewProducts.length,
                        'prev',
                      )
                    }
                    disabled={newArrivalsPos === 0}
                  />
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navButtonRight}`}
                    onClick={() =>
                      handleMove(
                        setNewArrivalsPos,
                        newArrivalsPos,
                        brandNewProducts.length,
                        'next',
                      )
                    }
                    disabled={
                      newArrivalsPos + frameSize >= brandNewProducts.length
                    }
                  />
                </div>
              </div>

              <div className={styles.homePageProductListContainer}>
                <div
                  className={styles.homePageProductList}
                  style={{ transform: getTransform(newArrivalsPos) }}
                >
                  {brandNewProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      itemId={product.itemId}
                      category={product.category}
                      image={product.image}
                      title={product.name}
                      price={product.price}
                      fullPrice={product.fullPrice}
                      screen={product.screen}
                      capacity={product.capacity}
                      ram={product.ram}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section
              className={`${styles.homePageSection} ${styles.categories}`}
            >
              <div className={styles.homePageSectionHeader}>
                <h2 className={styles.homePageSectionTitle}>
                  Shop by category
                </h2>
              </div>
              <div className={styles.categoriesContainer}>
                <CategoryLink
                  to="/phones"
                  img="img/category-phones.png"
                  label="Mobile phones"
                  count={categoryCounts.phones}
                />
                <CategoryLink
                  to="/tablets"
                  img="img/category-tablets.png"
                  label="Tablets"
                  count={categoryCounts.tablets}
                />
                <CategoryLink
                  to="/accessories"
                  img="img/accessories.png"
                  label="Accessories"
                  count={categoryCounts.accessories}
                />
              </div>
            </section>

            <section
              className={`${styles.homePageSection} ${styles.hotPrices}`}
            >
              <div className={styles.homePageSectionHeader}>
                <h2 className={styles.homePageSectionTitle}>Hot prices</h2>
                <div className={styles.homePageNavButtons}>
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navButtonLeft}`}
                    onClick={() =>
                      handleMove(
                        setHotPricesPos,
                        hotPricesPos,
                        hotProducts.length,
                        'prev',
                      )
                    }
                    disabled={hotPricesPos === 0}
                  />
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navButtonRight}`}
                    onClick={() =>
                      handleMove(
                        setHotPricesPos,
                        hotPricesPos,
                        hotProducts.length,
                        'next',
                      )
                    }
                    disabled={hotPricesPos + frameSize >= hotProducts.length}
                  />
                </div>
              </div>

              <div className={styles.homePageProductListContainer}>
                <div
                  className={styles.homePageProductList}
                  style={{ transform: getTransform(hotPricesPos) }}
                >
                  {hotProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      category={product.category}
                      itemId={product.itemId}
                      image={product.image}
                      title={product.name}
                      price={product.price}
                      fullPrice={product.fullPrice}
                      screen={product.screen}
                      capacity={product.capacity}
                      ram={product.ram}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </div>
  );
};
