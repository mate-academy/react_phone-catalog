import styles from './HomePage.module.scss';
import { HeroSlider } from './components/HeroSlider/HeroSlider';

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <h1 className={styles.homePage__title__hidden}>Product Catalog</h1>
      <header className={styles.homePage__header}>
        <h2 className={styles.homePage__header__title}>
          Welcome to Nice Gadgets store!
        </h2>
      </header>
      <HeroSlider />
    </section>
  );
};
