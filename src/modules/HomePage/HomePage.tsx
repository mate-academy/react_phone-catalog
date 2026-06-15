import { Slider } from './components/Slider/Slider';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.sliderSection}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${styles.titleMargin}`}>
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <Slider />
      </section>
      <NewModels />
      <Categories />
      <HotPrices />
    </main>
  );
};
