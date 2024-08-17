import { Slider } from '../Slider';
import styles from './Welcome.module.scss';

import bannerPhones from '../../assets/img/banners/banner-phones.png';
import bannerTablets from '../../assets/img/banners/banner-tablets.png';
import bannerAccessories from '../../assets/img/banners/banner-accessories.png';

const imagesForSlide = [bannerPhones, bannerTablets, bannerAccessories];

export const Welcome = () => {
  return (
    <section className={styles.welcome} id="welcome">
      <h2 className={styles.welcome__title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.welcome__slider}>
        <Slider images={imagesForSlide} infLoop={true} />
      </div>
    </section>
  );
};
