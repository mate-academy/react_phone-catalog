import { PicturesSlider } from '../PicturesSlider';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__top}>
        <h1 hidden>Product Catalog</h1>
        <h2 className={styles.hero__title}>Welcome to Nice Gadgets store!</h2>
      </div>

      <div className={styles.hero__banner}>
        <PicturesSlider />
      </div>
    </section>
  );
};
