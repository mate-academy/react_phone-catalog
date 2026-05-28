import Dots from '../Dots/Dots';
import styles from './Banner.module.scss';
import useSlider from '../../hooks/useSlider';

export const Banner = () => {
  const sliderPictures = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
  ];

  const { currentIndex, resetInterval, goTo, previus, next } = useSlider(
    sliderPictures.length,
  );

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <button
          className={`${styles.button} ${styles.button__left}`}
          onClick={() => {
            previus();
            resetInterval();
          }}
        >
          {'<'}
        </button>
        <div className={styles.slider__container}>
          {sliderPictures.map((picture, idx) => (
            <img
              key={idx}
              src={picture}
              alt={`slide ${idx}`}
              className={`${styles.slide} ${idx === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
        <button
          className={`${styles.button} ${styles.button__right}`}
          onClick={() => {
            next();
            resetInterval();
          }}
        >
          {'>'}
        </button>
      </div>
      <Dots
        sliderPictures={sliderPictures}
        dotsClick={goTo}
        currentIndex={currentIndex}
        resetInterval={resetInterval}
      />
    </div>
  );
};

export default Banner;
