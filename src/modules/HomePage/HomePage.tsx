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

  // ✅ VITE way (замість process.env.PUBLIC_URL)
  const baseUrl = import.meta.env.BASE_URL;

  const categoryPhones = `${baseUrl}img/category-phones.png`;
  const categoryTablets = `${baseUrl}img/category-tablets.png`;
  const categoryAccessories = `${baseUrl}img/category-accessories.png`;

  useEffect(() => {
    if (!goods || !goods.length) {
      setIsLoading(true);

      fetchProducts()
        .then(data => updateGoods(data as Product[]))
        .finally(() => {
          setTimeout(() => setIsLoading(false), 300);
        });
    }
  }, [goods, updateGoods, setIsLoading]);

  const brandNewGoods = useMemo(() => {
    return goods
      ? [...goods]
          .sort((a, b) =>
            b.year !== a.year ? b.year - a.year : b.fullPrice - a.fullPrice,
          )
          .map(good => ({ ...good, fullPrice: 0 }))
      : [];
  }, [goods]);

  const hotPricesGoods = useMemo(() => {
    return goods
      ? [...goods].sort(
          (a, b) =>
            b.fullPrice - b.price - (a.fullPrice - a.price),
        )
      : [];
  }, [goods]);

  const phonesAmount = useMemo(
    () => goods?.filter(g => g.category === 'phones').length ?? 0,
    [goods],
  );

  const tabletsAmount = useMemo(
    () => goods?.filter(g => g.category === 'tablets').length ?? 0,
    [goods],
  );

  const accessoriesAmount = useMemo(
    () => goods?.filter(g => g.category === 'accessories').length ?? 0,
    [goods],
  );

  return (
    <div className={styles.HomePage}>
      <h2 className={styles.homeTitle}>
        Welcome to Nice Gadgets store!
      </h2>

      <div className={styles.picturesContainer}>
        <PicturesSlider />
      </div>

      <div className={styles.newModelsContainer}>
        <ProductsSlider title="Brand new models" goods={brandNewGoods} />
      </div>

      <div className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Shop by category</h2>

        <div className={styles.categoryGrid}>
          <NavLink className={styles.categoryLink} to="/phones">
            <div className={styles.categoryItem}>
              <img src={categoryPhones} alt="phones" />
              <p>Mobile phones</p>
              <p>{phonesAmount} models</p>
            </div>
          </NavLink>

          <NavLink className={styles.categoryLink} to="/tablets">
            <div className={styles.categoryItem}>
              <img src={categoryTablets} alt="tablets" />
              <p>Tablets</p>
              <p>{tabletsAmount} models</p>
            </div>
          </NavLink>

          <NavLink className={styles.categoryLink} to="/accessories">
            <div className={styles.categoryItem}>
              <img src={categoryAccessories} alt="accessories" />
              <p>Accessories</p>
              <p>{accessoriesAmount} models</p>
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.hotDealsContainer}>
        <ProductsSlider title="Hot prices" goods={hotPricesGoods} />
      </div>
    </div>
  );
};
