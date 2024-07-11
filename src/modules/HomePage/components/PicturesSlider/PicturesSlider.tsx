import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { PicturesSliderMap } from '../Helpers/PicturesSliderMap';
import { useTheme } from '../../../../context/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import { getChevronIconSrc } from '../../../../servises/iconSrc';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../../utils/const';

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  const chevronIconSrc = getChevronIconSrc(theme);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % PicturesSliderMap.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? PicturesSliderMap.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === PicturesSliderMap.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <div className={styles.slider} {...handlers}>
      <button
        type="button"
        className={classNames(styles.button, styles.prev)}
        aria-label="Previous"
        onClick={handlePrevClick}
      >
        <img src={chevronIconSrc} alt="Previous" className={styles.iconPrev} />
      </button>
      <div className={styles.container}>
        {PicturesSliderMap.map(({ id, src, title }) => (
          <Link to={`/${title}`} key={id} className={classNames(styles.link)}>
            <img
              key={id}
              src={`${BASE_URL}/${src}`}
              alt={`Slide ${title}`}
              className={classNames(styles.image)}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            />
          </Link>
        ))}
      </div>
      <button
        type="button"
        className={classNames(styles.button, styles.next)}
        aria-label="Next"
        onClick={handleNextClick}
      >
        <img src={chevronIconSrc} alt="Next" className={styles.iconNext} />
      </button>

      <div className={styles.dashes}>
        {PicturesSliderMap.map(({ id }, index) => (
          <span
            key={id}
            tabIndex={0}
            role="button"
            onClick={() => setCurrentIndex(index)}
            className={styles.dashContainer}
            onKeyDown={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          >
            <div
              className={classNames(styles.dash, {
                [styles.active]: index === currentIndex,
              })}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
