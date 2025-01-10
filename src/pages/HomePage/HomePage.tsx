import { HomeSwiper } from '../../components/Swiper';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Catalog</h1>
      <HomeSwiper />
    </div>
  );
};
