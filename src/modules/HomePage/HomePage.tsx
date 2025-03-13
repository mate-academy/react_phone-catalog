import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useMemo } from 'react';
import styles from './HomePage.module.scss';
import { fetchProducts } from '../../services/products';
import { Product } from '../../types/types';
import { ProductsContext } from '../../context/ProductsContext';
import PicturesSlider from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useLoading } from '../../context/LoadingContext';

export const HomePage: React.FC = () => {
  const { goods, updateGoods } = useContext(ProductsContext);
  const { setIsLoading } = useLoading();

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
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        });
    }
  }, [goods, updateGoods, setIsLoading]);

  const brandNewGoods = useMemo(() => {
    return goods
      ? [...goods]
          .sort((a, b) => {
            if (b.year !== a.year) {
              return b.year - a.year;
            }

            return b.fullPrice - a.fullPrice;
          })
          .map(good => ({ ...good, fullPrice: 0 }))
      : [];
  }, [goods]);

  const hotPricesGoods = useMemo(() => {
    return goods
      ? [...goods].sort((a, b) => {
          return b.fullPrice - b.price - (a.fullPrice - a.price);
        })
      : [];
  }, [goods]);

  const phonesAmount = useMemo(() => {
    return goods ? goods.filter(good => good.category === 'phones').length : null;
  }, [goods]);

  const tabletsAmount = useMemo(() => {
    return goods ? goods.filter(good => good.category === 'tablets').length : null;
  }, [goods]);

  const accessoriesAmount = useMemo(() => {
    return goods ? goods.filter(good => good.category === 'accessories').length : null;
  }, [goods]);

  return (
    <div className={styles.HomePage}>
      <h2 className={styles.homeTitle}> Welcome to Nice Gadgets store!</h2>

      <div className={styles.picturesContainer}>
        <PicturesSlider />
      </div>

      <div className={styles.newModelsContainer}>
        <ProductsSlider title={'Brand new models'} goods={brandNewGoods} />
      </div>

      <div className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Shop by category</h2>

        <div className={styles.categoryGrid}>
          <NavLink className={styles.categoryLink} to="/phones">
            <div className={styles.categoryItem}>
              <div
                className={`${styles.categoryImgContainer} ${styles['categoryImgContainer--phones']}`}
              >
                <img
                  className={`${styles.categoryImg} ${styles['categoryImg--phones']}`}
                  src={categoryPhones}
                  alt="phones"
                />
              </div>
              <p className={styles.categoryName}>Mobile phones</p>
              <p className={styles.categoryCount}>{phonesAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="/tablets">
            <div className={styles.categoryItem}>
              <div
                className={`${styles.categoryImgContainer} ${styles['categoryImgContainer--tablets']}`}
              >
                <img
                  className={`${styles.categoryImg} ${styles['categoryImg--tablets']}`}
                  src={categoryTablets}
                  alt="tablets"
                />
              </div>
              <p className={styles.categoryName}>Tablets</p>
              <p className={styles.categoryCount}>{tabletsAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="/accessories">
            <div className={styles.categoryItem}>
              <div
                className={`${styles.categoryImgContainer} ${styles['categoryImgContainer--accessories']}`}
              >
                <img
                  className={`${styles.categoryImg} ${styles['categoryImg--accessories']}`}
                  src={categoryAccessories}
                  alt="accessories"
                />
              </div>
              <p className={styles.categoryName}>Accessories</p>
              <p className={styles.categoryCount}>{accessoriesAmount} models</p>
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.hotDealsContainer}>
        <ProductsSlider title={'Hot prices'} goods={hotPricesGoods} />
      </div>
    </div>
  );
};
