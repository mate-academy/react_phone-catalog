import { MySwiper } from '../swiper/index';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.header__title}>Welcome to Nice Gadgets store!</h2>

      <MySwiper />
    </header>
  );
};
