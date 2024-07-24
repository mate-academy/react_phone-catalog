import { Slider } from '../Slider';
import styles from './Welcome.module.scss';
import classNames from 'classnames';

const imagesForSlide = [
  // from public/img... or creat json in api?
  './img/welcome-slider-mobile-0.png',
  './img/welcome-slider-mobile-1.png',
  './img/welcome-slider-mobile-2.png',
];

export const Welcome = () => {
  return (
    <section className="welcome">
      <h2 className={classNames(styles.welcome__title)}>
        Welcome to Nice Gadgets store!
      </h2>

      <Slider images={imagesForSlide} infLoop={true} />
    </section>
  );
};
