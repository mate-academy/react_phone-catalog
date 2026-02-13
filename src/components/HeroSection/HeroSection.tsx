import { PicturesSlider } from '../PicturesSlider';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={`${styles.title} homeTitle`}>
        Welcome to Nice Gadgets store!
      </div>

      <PicturesSlider />
    </div>
  );
};
