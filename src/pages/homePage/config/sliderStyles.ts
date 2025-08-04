import styles from '../styles/HomePage.module.scss';

const heroStyles = {
  viewport: styles['hero-slider__viewport'],
  pagination: styles['hero-slider__pagination'],
  buttonPrev: styles['hero-slider__button-prev'],
  buttonNext: styles['hero-slider__button-next'],
};

const prodStyles = {
  viewport: styles.prodSwiper__viewport,
  buttonPrev: styles['prodSwiper__button-prev'],
  buttonNext: styles['prodSwiper__button-next'],
};

export { heroStyles, prodStyles };
