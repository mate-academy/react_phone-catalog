import { useContext } from 'react';
import { ProductSlider } from '../../shared/components/ProductsSlider/ProductSlider';
import styles from './HomePage.module.scss';
import { ProductContext } from '../../shared/store/GlobalProvider';
import { productFilterByNew } from './utils/productFilterByNew';
import { getHotPriceProduct } from './utils/getHotPriceProduct';
import { HomePageSlider } from './components/HomePageSlider/HomePageSlider';
import { CategoryCards } from './components/CategoryCards/CategoryCards';

export const HomePage = () => {
  scrollTo(0, 0);
  const { data } = useContext(ProductContext);
  const newProducts = productFilterByNew(data);
  const hotPriceProducts = getHotPriceProduct(data);

  return (
    <main className={styles.main}>
      <h1 className={styles.main__visuallyHidden}>Product Catalog</h1>
      <p className={styles.main__title}>Welcome to Nice Gadgets store!</p>

      <div className={styles.main__wrapper}>
        <HomePageSlider />
        <ProductSlider
          title={'Brand new models'}
          products={newProducts}
          isHotPrice={false}
          sliderId={'new'}
        />
        <CategoryCards data={data} />
        <ProductSlider
          title={'Hot prices'}
          products={hotPriceProducts}
          isHotPrice={true}
          sliderId={'new'}
        />
      </div>
    </main>
  );
};
