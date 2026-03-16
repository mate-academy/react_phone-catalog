import styles from './HomePage.module.scss';
import { HeroSlider } from '@/components/layout/HeroSlider';

export const HomePage = () => {
  return (
    <div className="container">
      <div className={styles.homeWraper}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <HeroSlider />
      </div>
    </div>
  );
};
