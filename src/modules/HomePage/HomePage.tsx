import { BannerSlider } from '../../components/BannerSlider';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <BannerSlider />
    </section>
  );
};
