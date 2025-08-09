import { Categories } from '../../components/Categories';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>

      <ProductsSlider
        title={'Brand new models'}
        filter={item => item.name.includes('14')}
      />
      <Categories />
      <ProductsSlider title={'Hot prices'} filter={item => item.price > 1000} />
    </main>
  );
};
