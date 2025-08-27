import { useContext } from 'react';
import styles from './homePage.module.scss';
import { ProductContext } from '../../context/ProductContext';
import { Title } from '../../components/title';
import { Slider } from '../../components/slider';
import { SectionSlider } from '../../components/sectionSlider';
import { ShopByCategory } from '../../components/shopByCategory';

export const HomePage = () => {
  const { products } = useContext(ProductContext);

  const hotPrices = [...products]
    .filter(product => product.year <= 2019)
    .sort((prod1, prod2) => prod2.price - prod1.price);

  const filteredNewBrand = [...products]
    .filter(prod => prod.year >= 2022)
    .sort((prod1, prod2) => prod2.price - prod1.price);

  return (
    <div className={styles.homePage}>
      <div className={styles.homeTop}>
        <Title title="home" />
        <Slider />
      </div>
      <SectionSlider product={filteredNewBrand} />
      <ShopByCategory />
      <SectionSlider product={hotPrices} hotPrice />
    </div>
  );
};
