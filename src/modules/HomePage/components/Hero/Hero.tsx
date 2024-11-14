import styles from './Hero.module.scss';
import { Slider } from './Slider';

export const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h2>
      <Slider />
    </section>
  );
};
