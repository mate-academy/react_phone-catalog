import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BANNER_IMAGES, BANNER_IMAGES_MOBILE } from '../../constants';
import { TouchSlider } from '../TouchSlider';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './PicturesSlider.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';

export const PicturesSlider = () => {
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const timerId = useRef(0);
  const { t } = useTranslation();

  const handleNextImage = useCallback(() => {
    setOrderIndex(prev =>
      prev === BANNER_IMAGES.length - 1 ? 0 : orderIndex + 1,
    );
  }, [orderIndex]);

  const handlePrevImage = () => {
    setOrderIndex(prev => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    timerId.current = autoPlay
      ? window.setTimeout(() => handleNextImage(), 5000)
      : 0;

    return () => window.clearTimeout(timerId.current);
  }, [autoPlay, handleNextImage]);

  return (
    <section className={styles.block} aria-label="banner slider">
      <div className={styles.main}>
        <button
          type="button"
          className={`${btnStyles.block} ${btnStyles.slider}`}
          onClick={handlePrevImage}
          aria-label={t(TRANSLATIONS.hero.slider.button.prev.ariaLabel)}
        >
          <span
            className={`${iconStyles.block} ${iconStyles.arrowLeft}`}
          ></span>
        </button>

        <div
          className={styles.imageHolder}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {BANNER_IMAGES.map((img, index) => {
            const { url, alt, link } = img;

            return (
              <Link
                to={link}
                style={{ translate: `${-100 * orderIndex}%` }}
                key={`${img}-${index}`}
                className={styles.imageFrame}
                onFocus={() => setAutoPlay(false)}
                onBlur={() => setAutoPlay(true)}
              >
                <img
                  src={url}
                  alt={alt}
                  className={styles.image}
                  aria-hidden={index !== orderIndex}
                />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className={`${btnStyles.block} ${btnStyles.slider}`}
          onClick={handleNextImage}
          aria-label={t(TRANSLATIONS.hero.slider.button.next.ariaLabel)}
        >
          <span
            className={`${iconStyles.block} ${iconStyles.arrowRight}`}
          ></span>
        </button>
      </div>

      <div className={styles.mobile}>
        <TouchSlider
          images={BANNER_IMAGES_MOBILE}
          order={orderIndex}
          setOrder={setOrderIndex}
        />
      </div>

      <div className={styles.dots}>
        {BANNER_IMAGES.map((item, index) => {
          const { url } = item;

          return (
            <button
              key={`${url}-${index}`}
              type="button"
              className={classNames(styles.dot, {
                [styles.dot_m_active]: index === orderIndex,
              })}
              onClick={() => setOrderIndex(index)}
              disabled={index === orderIndex}
              aria-label={t(TRANSLATIONS.hero.slider.dot.ariaLabel, {
                imageNumber: index + 1,
              })}
            ></button>
          );
        })}
      </div>
    </section>
  );
};
