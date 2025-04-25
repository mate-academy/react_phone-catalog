import { BrandNew } from '../../components/BrandNew/BrandNew';
import { ShopByCategories } from '../../components/Categories/ByCategories';
import { Footer } from '../../components/Footer/Footer';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { MySlider } from '../../components/PhotoSlider/PhotoSlider';
import styles from './HomePag.module.scss';

export function HomePage() {
  return (
    <>
      <div className={styles.welcome_text}>
        <h1>Welcome to Nice Gadgets store!</h1>
      </div>
      <section>
        <MySlider />
      </section>

      <section>
        <BrandNew />
      </section>

      <section>
        <ShopByCategories />
      </section>

      <section>
          <HotPrices />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}
