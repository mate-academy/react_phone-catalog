import styles from './homeface.module.scss';
import column from '../../grid.module.scss';
import classNames from 'classnames';
import { HomeCarousel } from './HomeCarousel';
import { ProductsSlider } from './ProductsSlider';
import { Footer } from '../../Footer/Footer';

export const HomeFace = () => {
  return (
    <>
      <div className={styles.home_page}>
        <div className={column.grid}>
          <h1 hidden>Product Catalog</h1>

          <h1 className={classNames(styles.home_font, column.grid_h1)}>
            Welcome to Nice Gadgets store!
          </h1>

          <HomeCarousel />
        </div>

        <ProductsSlider />
      </div>
      <Footer />
    </>
  );
};
