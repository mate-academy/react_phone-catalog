import styles from './Hero.module.scss';
import { Slider } from './Slider';

export const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h1>
      <Slider />
    </div>
  );
};
