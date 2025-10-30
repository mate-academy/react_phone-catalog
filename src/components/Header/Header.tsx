import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Header.module.scss';
import { SliderSwiper } from './Swiper';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <h1 className={styles.header_title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <SliderSwiper />
    </div>
  );
};

export default Header;
