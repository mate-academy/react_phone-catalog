import { FC } from 'react';
import { PictureSlider } from './components/PictureSlider';
import styles from './HomePage.module.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from './components/Categories/Category';

export const HomePage: FC = () => {
  return (
    <div className={styles.home}>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>
        <PictureSlider />
      </div>
      <ProductSlider title={'Brand new models'} mb />
      <Category />
      <ProductSlider title={'Hot prices'} mb />
    </div>
  );
};
