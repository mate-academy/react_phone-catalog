import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.hero}>
      <Hero />
    </div>
  );
};
