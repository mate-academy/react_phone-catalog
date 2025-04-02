import { useEffect } from 'react';
import { Categories } from '../../components/Categories';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProducts } from '../../store/ProductsContext';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>
        Welcome to Nice Gadgets store!
      </h1>
      {loading ? (
        <div className={styles['home-page__loader']}>
          {' '}
          <Loader />
        </div>
      ) : (
        <div className={styles['home-page__content']}>
          <PicturesSlider />
          <ProductsSlider
            title={'Brand new models'}
            products={products}
            type={'new'}
          />
          <Categories />
          <ProductsSlider
            title={'Hot prices'}
            products={products}
            type={'hot'}
            hot={true}
          />
        </div>
      )}
    </div>
  );
};
