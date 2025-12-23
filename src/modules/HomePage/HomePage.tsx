import { CategoriesBlock } from './components/CategoriesBlock/CategoriesBlock';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* SEO h1 – visually hidden */}
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      {/* Hero slider */}
      <PicturesSlider />

      {/* Brand new */}

      <ProductsSlider type="new" />

      {/* Categories */}
      <CategoriesBlock />

      {/* Hot prices */}

      <ProductsSlider type="hot" />
    </div>
  );
};
