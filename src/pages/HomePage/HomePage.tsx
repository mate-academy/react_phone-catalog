import { useContext } from 'react';
import { Categories } from './components/Categories/Categories';
import { ProductContext } from '../../store/ProductContext';
import { SliderSection } from '../shared/SliderSection/SliderSection';
import styles from './HomePage.module.scss';
import { PictureSlider } from './components/PicSlider/PictureSlider';

export const HomePage = () => {
  const { products } = useContext(ProductContext);

  const hotPrices = [...products].sort((a, b) => {
    const price1 = a.priceRegular - a.priceDiscount;
    const price2 = b.priceRegular - b.priceDiscount;

    return price2 - price1;
  });

  const newModels = [...products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className={styles.homePage}>
      <div className="container">
        <h2 className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h2>
        <section
          className={`${styles.homePage__section} ${styles['homePage__section--pictureSlider']}`}
        >
          <PictureSlider />
        </section>
        <section
          className={`${styles.homePage__section} ${styles['homePage__section--slider']}`}
        >
          <SliderSection products={newModels} title="Brand new models" />
        </section>
        <section
          className={`${styles.homePage__section} ${styles['homePage__section--categories']}`}
        >
          <Categories />
        </section>
        <section
          className={`${styles.homePage__section} ${styles['homePage__section--slider']}`}
        >
          <SliderSection products={hotPrices} title="Hot prices" />
        </section>
      </div>
    </div>
  );
};
