import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BANNER_IMAGES, BANNER_IMAGES_MOBILE } from '../../constants';
import { TouchSlider } from '../TouchSlider';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const PicturesSlider = () => {
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
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
    <section className="banner-slider" aria-label="banner slider">
      <div className="banner-slider__main">
        <button
          type="button"
          className="btn btn--slider"
          onClick={handlePrevImage}
          aria-label={t(TRANSLATIONS.hero.slider.button.prev.ariaLabel)}
        >
          <span className="icon icon--arrow-left"></span>
        </button>

        <div
          className="banner-slider__image-holder"
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
                className={classNames('banner-slider__image-frame', {
                  skeleton: isSkeleton,
                })}
                onFocus={() => setAutoPlay(false)}
                onBlur={() => setAutoPlay(true)}
              >
                <img
                  src={url}
                  alt={alt}
                  className="banner-slider__image"
                  onLoad={() => setIsSkeleton(false)}
                  aria-hidden={index !== orderIndex}
                />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="btn btn--slider"
          onClick={handleNextImage}
          aria-label={t(TRANSLATIONS.hero.slider.button.next.ariaLabel)}
        >
          <span className="icon icon--arrow-right"></span>
        </button>
      </div>

      <div className="banner-slider__mobile">
        <TouchSlider
          images={BANNER_IMAGES_MOBILE}
          order={orderIndex}
          setOrder={setOrderIndex}
        />
      </div>

      <div className="banner-slider__dots">
        {BANNER_IMAGES.map((item, index) => {
          const { url } = item;

          return (
            <button
              key={`${url}-${index}`}
              type="button"
              className={classNames('banner-slider__dot', {
                'banner-slider__dot--active': index === orderIndex,
              })}
              onClick={() => setOrderIndex(index)}
              disabled={index === orderIndex}
              // aria-label={`View image ${index + 1}`}
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
