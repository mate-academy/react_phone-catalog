import { useContext } from 'react';
import styles from './HomePage.module.scss';
import { PictureSlider } from '../../components/PictureSlider';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Category } from '../../components/Category';
import { ProductContext } from '../../context/ProductContext';

const HomePage = () => {
  const { newProducts, hotProducts } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div>
        <PictureSlider />
        <ProductSlider title={'Brand new models'} products={newProducts} />
        <Category />
        <ProductSlider title={'Hot prices'} products={hotProducts} />
      </div>
    </section>
  );
};

export default HomePage;
