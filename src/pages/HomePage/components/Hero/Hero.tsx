import styles from './Hero.module.scss';
import { HeroSlider } from '../HeroSlider';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Welcome to Nice Gadgets store!</h1>
      <HeroSlider />
    </section>
  );
};
