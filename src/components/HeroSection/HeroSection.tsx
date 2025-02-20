import { PicturesSlider } from '../PicturesSlider';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <h1 className={`${styles.title} homeTitle`}>
        Welcome to Nice Gadgets store!
      </h1>

      <PicturesSlider />
    </div>
  );
};
