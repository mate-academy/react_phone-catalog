import { FC, useMemo } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { useGlobalState } from '../../context/store';
import { ProductsSlider } from '../shared/ProductsSlider/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';

export const HomePage: FC = () => {
  const { products } = useGlobalState();

  const newestPhones = useMemo(
    () =>
      products
        .filter(product => product.category === 'phones')
        .toSorted((phone1, phone2) => phone2.year - phone1.year),
    [products],
  );

  const discountPhones = useMemo(
    () =>
      products
        .filter(product => product.category === 'phones')
        .toSorted(
          (phone1, phone2) =>
            phone2.fullPrice - phone2.price - (phone1.fullPrice - phone1.price),
        ),
    [products],
  );

  return (
    <div className={styles.homeContent}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.homeBody}>
        <PicturesSlider />

        <ProductsSlider
          title="Brand new models"
          products={newestPhones}
          priceType="regular"
        />

        <ShopByCategory />

        <ProductsSlider
          title="Hot prices"
          products={discountPhones}
          priceType="discount"
        />
      </div>
    </div>
  );
};
