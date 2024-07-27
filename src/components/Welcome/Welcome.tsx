import { Slider } from '../Slider';
import styles from './Welcome.module.scss';

const imagesForSlide = [
  // from public/img... or creat json in api?
  './img/banner-phones.png',
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

export const Welcome = () => {
  return (
    <section className={styles.welcome} id="welcome">
      <h2 className={styles.welcome__title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.welcome__slider}>
        <Slider images={imagesForSlide} infLoop={false} />
      </div>
    </section>
  );
};
