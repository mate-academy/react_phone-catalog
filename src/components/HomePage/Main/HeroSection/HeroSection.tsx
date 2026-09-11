import { HeroCarousel } from './HeroCarousel';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <>
      <h1 className="visuallyHidden">Product Catalog</h1>
      <div className={styles.pageWrapper}>
        <div className={styles.contentContainer}>
          <h2 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h2>

          <HeroCarousel />
        </div>
      </div>
    </>
  );
};
