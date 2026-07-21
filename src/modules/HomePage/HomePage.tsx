import styles from './HomePage.module.scss';

import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HeroSlider } from '../../components/HeroSlider/HeroSlider';
import { NewModels } from '../../components/NewModels/NewModels';
import { Categories } from '../../components/Categories/Categories';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <HeroSlider />
          </section>

          <section className={styles.section}>
            <NewModels />
          </section>

          <section className={styles.section}>
            <Categories />
          </section>

          <section className={styles.section}>
            <HotPrices />
          </section>
        </div>
      </main>
    </>
  );
};
