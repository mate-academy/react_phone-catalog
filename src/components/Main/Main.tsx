import { ProductsSlider } from '../ProductsSlider';
import styles from './Main.module.scss';
import { ShopByCategory } from '../ShopByCategory';

export const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.productsSlider}>
        <div className={styles.slider}>
          <ProductsSlider itemsType={'Newest'} title={'Brand new models'} />
        </div>
      </div>

      <div className={styles.shopByCategorys}>
        <ShopByCategory />
      </div>

      <div className={styles.productsSlider}>
        <div className={styles.slider}>
          <ProductsSlider itemsType={'Hotest'} title={'Hot prices'} />
        </div>
      </div>
    </main>
  );
};
