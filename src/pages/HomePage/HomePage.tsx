import { HeroSection } from '../../components/HeroSection';
import { Main } from '../../components/Main';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h2 className="hiddenTitle">Product Catalog</h2>
      <HeroSection />

      <Main />
    </div>
  );
};
