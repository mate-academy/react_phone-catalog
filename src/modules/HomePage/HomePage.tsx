import { CategoriesBlock } from './components/CategoriesBlock/CategoriesBlock';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* SEO h1 – visually hidden */}

      {/* Hero slider */}
      <PicturesSlider />

      {/* Brand new */}

      <ProductsSlider type="new" title="Brand new models" />

      {/* Categories */}
      <CategoriesBlock />

      {/* Hot prices */}

      <ProductsSlider type="hot" title="Hot prices" />
    </div>
  );
};
