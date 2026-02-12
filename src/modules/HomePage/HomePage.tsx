import styles from './HomePage.module.scss';

import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { CategoryCards } from './components/CategoryCards';
import { HomePageSlider } from './components/HomePageSlider';

import { SectionTitles } from '../../shared/constants/sectionTitles';
import { SliderId } from '../../shared/constants/sliderId';
import { productFilterByNew } from './utils/productFilterByNew';
// eslint-disable-next-line
import { getHotProductsWithDiscount } from './utils/getHotProductsWithDiscount';

import { useAppSelector } from '../../store/hooks';

export const HomePage = () => {
  const data = useAppSelector(state => state.products.data);

  const newProducts = productFilterByNew(data);
  const productsWithHotPrice = getHotProductsWithDiscount(data);

  return (
    <main className={styles.main}>
      <h1 className={styles.main__visuallyHidden}>Product Catalog</h1>
      <p className={styles.main__title}>Welcome to Nice Gadgets store!</p>
      <div className={styles.main__wrapper}>
        <HomePageSlider />
        <ProductsSlider
          title={SectionTitles.NewModels}
          products={newProducts}
          sliderId={SliderId.New}
          isHotPrice={false}
        />
        <CategoryCards data={data} />
        <ProductsSlider
          title={SectionTitles.HotPrices}
          products={productsWithHotPrice}
          sliderId={SliderId.Hot}
          isHotPrice={true}
        />
      </div>
    </main>
  );
};
