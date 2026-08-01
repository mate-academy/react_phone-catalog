import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { TranslationKey } from '@shared/i18n';
import { chevronRightIcon } from '@shared/assets/icons';
import styles from './PicturesSlider.module.scss';

const SLIDES: { image: string; link: string; altKey: TranslationKey }[] = [
  {
    image: 'img/banner-phones.webp',
    link: '/phones',
    altKey: 'slider.bannerPhones',
  },
  {
    image: 'img/banner-tablets.webp',
    link: '/tablets',
    altKey: 'slider.bannerTablets',
  },
  {
    image: 'img/banner-accessories.webp',
    link: '/accessories',
    altKey: 'slider.bannerAccessories',
  },
];

const SLIDE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const showNext = useCallback(() => {
    setCurrent(index => (index + 1) % SLIDES.length);
  }, []);

  const showPrev = () => {
    setCurrent(index => (index - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(showNext, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [current, showNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.main}>
        <button
          type="button"
          className={styles.arrow}
          aria-label={t('slider.prevPicture')}
          onClick={showPrev}
        >
          <img
            src={chevronRightIcon}
            alt=""
            className={cn('icon', styles.arrowIconPrev)}
          />
        </button>

        <div className={styles.viewport}>
          <ul
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map(({ image, link, altKey }) => (
              <li key={image} className={styles.slide}>
                <Link to={link} className={styles.slideLink}>
                  <img
                    src={image}
                    alt={t(altKey)}
                    className={styles.slideImage}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label={t('slider.nextPicture')}
          onClick={showNext}
        >
          <img src={chevronRightIcon} alt="" className="icon" />
        </button>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={t('slider.showPicture', { index: index + 1 })}
            className={cn(styles.dot, {
              [styles.dotActive]: index === current,
            })}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
