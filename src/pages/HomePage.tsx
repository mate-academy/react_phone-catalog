//#region imports
import { fetchProducts } from '../utils/fetchProducts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Slider } from '../components/Slider';
import { ProductSlider } from '../components/ProductSlider';
import { NavButton } from '../components/NavButton';
import { Loader } from '../components/Loader';
import { ErrorPage } from '../components/ErrorPage';

import { Product } from '../types/product';

import categoryPhones from '../../public/img/category-phones.webp';
import categoryTablets from '../../public/img/category-tablets.webp';
import categoryAccessories from '../../public/img/category-accessories.webp';

import styles from '../styles/HomePage.module.scss';
//#endregion

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newModelsIndex, setNewModelsIndex] = useState(0);
  const [hotPricesIndex, setHotPricesIndex] = useState(0);
  const [newModelsMaxIndex, setNewModelsMaxIndex] = useState(0);
  const [hotPricesMaxIndex, setHotPricesMaxIndex] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const hotPricesProducts = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  const brandNewProducts = [...products].sort((a, b) => b.year - a.year);

  const loadProducts = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const allProducts = fetchProducts();

      const countsModels = {
        phones: 0,
        tablets: 0,
        accessories: 0,
      };

      for (const p of allProducts) {
        switch (p.category) {
          case 'phones':
            countsModels.phones++;
            break;
          case 'tablets':
            countsModels.tablets++;
            break;
          case 'accessories':
            countsModels.accessories++;
            break;
        }
      }

      setNumberOfProducts(countsModels);
      setProducts(allProducts);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const slideNewModelsNext = () => {
    if (newModelsIndex < newModelsMaxIndex) {
      setNewModelsIndex(prev => prev + 1);
    }
  };

  const slideNewModelsPrev = () => {
    if (newModelsIndex > 0) {
      setNewModelsIndex(newModelsIndex - 1);
    }
  };

  const slideHotPricesNext = () => {
    if (hotPricesIndex < hotPricesMaxIndex) {
      setHotPricesIndex(prev => prev + 1);
    }
  };

  const slideHotPricesPrev = () => {
    if (hotPricesIndex > 0) {
      setHotPricesIndex(hotPricesIndex - 1);
    }
  };

  if (isError) {
    return <ErrorPage reload={loadProducts} />;
  }

  return (
    <main className={styles.homePage}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.homePage__container}>
            <div className={styles.homePage__titleBlock}>
              <h1 className={styles.visuallyHidden}>Product Catalog</h1>
            </div>
          </div>

          <Slider />

          <div className={styles.homePage__container}>
            <div className={styles.homePage__titleBlock}>
              <h1 className={styles.homePage__title}>Brand new models</h1>
              <div className={styles.homePage__nav}>
                <NavButton
                  direction="left"
                  disabled={newModelsIndex === 0}
                  onClick={slideNewModelsPrev}
                />
                <NavButton
                  direction="right"
                  disabled={newModelsIndex >= newModelsMaxIndex}
                  onClick={slideNewModelsNext}
                />
              </div>
            </div>

            <ProductSlider
              FilterredProducts={brandNewProducts}
              currentIndex={newModelsIndex}
              onSlide={setNewModelsIndex}
              isDiscounted={false}
              onMaxIndexChange={setNewModelsMaxIndex}
            />

            <div className={styles.homePage__titleBlock}>
              <h1 className={styles.homePage__title}>Shop by category</h1>
            </div>

            <div className={styles.homePage__categories}>
              <Link to="/phones" className={styles.homePage__category}>
                <div className={styles.homePage__categoryIcon}>
                  <img
                    className={styles.homePage__categoryIconImg}
                    src={categoryPhones}
                    alt="phone"
                  />
                </div>
                <div className={styles.homePage__categoryDescription}>
                  <div className={styles.homePage__categoryName}>
                    Mobile phones
                  </div>
                  <div className={styles.homePage__categoryNumber}>
                    {numberOfProducts.phones} models
                  </div>
                </div>
              </Link>

              <Link to="/tablets" className={styles.homePage__category}>
                <div className={styles.homePage__categoryIcon}>
                  <img
                    className={styles.homePage__categoryIconImg}
                    src={categoryTablets}
                    alt=""
                  />
                </div>
                <div className={styles.homePage__categoryDescription}>
                  <div className={styles.homePage__categoryName}>Tablets</div>
                  <div className={styles.homePage__categoryNumber}>
                    {numberOfProducts.tablets} models
                  </div>
                </div>
              </Link>

              <Link to="/accessories" className={styles.homePage__category}>
                <div className={styles.homePage__categoryIcon}>
                  <img
                    className={styles.homePage__categoryIconImg}
                    src={categoryAccessories}
                    alt=""
                  />
                </div>
                <div className={styles.homePage__categoryDescription}>
                  <div className={styles.homePage__categoryName}>
                    Accessories
                  </div>
                  <div className={styles.homePage__categoryNumber}>
                    {numberOfProducts.accessories} models
                  </div>
                </div>
              </Link>
            </div>

            <div className={styles.homePage__titleBlock}>
              <h1 className={styles.homePage__title}>Hot Prices</h1>
              <div className={styles.homePage__nav}>
                <NavButton
                  direction="left"
                  disabled={hotPricesIndex === 0}
                  onClick={slideHotPricesPrev}
                />
                <NavButton
                  direction="right"
                  disabled={hotPricesIndex >= hotPricesMaxIndex}
                  onClick={slideHotPricesNext}
                />
              </div>
            </div>

            <ProductSlider
              FilterredProducts={hotPricesProducts}
              currentIndex={hotPricesIndex}
              onSlide={setHotPricesIndex}
              isDiscounted={true}
              onMaxIndexChange={setHotPricesMaxIndex}
            />
          </div>
        </>
      )}
    </main>
  );
};
