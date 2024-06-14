import { useContext } from 'react';
import { Categories } from '../../components/categories/Categories';
import { PhotoSlider } from '../../components/photoSlider';
import { ProductSlider } from '../../components/productSlider';
import styles from './HomePage.module.scss';
import { AppContext } from '../../store/context';

export const HomePage = () => {
  const { phones } = useContext(AppContext);

  return (
    <>
      <section className={styles.homepage}>
        <h1 className={styles.homepage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <PhotoSlider />
        <ProductSlider type="Brand new models" products={phones} />
        <Categories />
        <ProductSlider type="Hot prices" products={phones} />
      </section>
    </>
  );
};
