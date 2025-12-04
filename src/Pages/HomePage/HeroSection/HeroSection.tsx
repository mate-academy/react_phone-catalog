import { HeroSlider } from '../HeroSlider';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={styles.hero__section}>
      <h2 className={styles['hero__section-title']}>
        Welcome to Nice Gadgets store!
      </h2>
      <div className={styles['hero-slider__wrapper']}>
        <HeroSlider></HeroSlider>
      </div>
    </section>
  );
};
