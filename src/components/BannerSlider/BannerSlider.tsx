import styles from './BannerSlider.module.scss';
import { BannerPictures } from '../../utils/Arrays';
import { useTheme } from '../../context/ThemeContext';
import {
  getArrowLeftActiveIcon,
  getArrowRightActiveIcon,
} from '../../utils/getIcons';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BASE_URL } from '../../utils/fetchClient';
import classNames from 'classnames';

export const BannerSlider = () => {
  const { theme } = useTheme();
  const arrowLeftIcon = getArrowLeftActiveIcon(theme);
  const arrowRightIcon = getArrowRightActiveIcon(theme);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % BannerPictures.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLeftClick = () => {
    setSlideIndex(prevIndex =>
      prevIndex === 0 ? BannerPictures.length - 1 : prevIndex - 1,
    );
  };

  const handleRightClick = () => {
    setSlideIndex(prevIndex =>
      prevIndex === BannerPictures.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleRightClick(),
    onSwipedRight: () => handleLeftClick(),
  });

  return (
    <div className={styles.bannerSlider} {...handlers}>
      <button
        type="button"
        className={styles.button}
        onClick={handleLeftClick}
        aria-label="Previous"
      >
        <img src={arrowLeftIcon} alt="arrowleft" />
      </button>

      <div className={styles.slideWrapper}>
        {BannerPictures.map(({ id, name, src }) => (
          <img
            key={id}
            src={`${BASE_URL}/${src}`}
            alt={`${name}slide`}
            className={styles.slideImg}
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className={classNames(styles.button, styles.rightButton)}
        onClick={handleRightClick}
        aria-label="Next"
      >
        <img src={arrowRightIcon} alt="arrowright" />
      </button>

      <div className={styles.navDots}>
        {BannerPictures.map(({ id }, index) => (
          <span
            key={id}
            role="button"
            tabIndex={0}
            onClick={() => setSlideIndex(index)}
            onKeyDown={() => setSlideIndex(index)}
            className={styles.dotWrapper}
          >
            <div
              className={classNames(styles.dot, {
                [styles.dotActive]: index === slideIndex,
              })}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
