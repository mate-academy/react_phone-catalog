import { useCallback, useEffect, useState } from 'react';
import styles from './HeroSection.module.scss';
import { Icon } from '../../../shared/components/Icon/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  imageUrls: string[];
  delay?: number;
};

export const HeroSection = ({ imageUrls, delay = 5000 }: Props) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const changeSlide = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') {
        setActiveIndex(
          prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
        );
      } else {
        setActiveIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
      }
    },
    [imageUrls.length],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide('right');
    }, delay);

    return () => clearInterval(interval);
  }, [changeSlide, delay]);

  return (
    <section className={styles.hero}>
      <h2 className={styles.hero__title}>{t('home.welcomeTitle')}</h2>
      <div className={`${styles.hero} section--full-width`}>
        <div className={styles.picturesSlider}>
          <div className={styles.picturesSlider__container}>
            <div
              className={styles.picturesSlider__button}
              onClick={() => changeSlide('left')}
            >
              <Icon name="arrow-left" />
            </div>
            <div className={styles.picturesSlider__content}>
              <div className={styles.picturesSlider__aside}>
                <div>
                  <div>
                    <div className={styles['picturesSlider__aside-title']}>
                      {t('home.nowAvailable')}
                    </div>
                    <span className={styles['picturesSlider__aside-title']}>
                      {t('home.inOurStore')}
                      <img
                        src="img/icons/ok-hand.svg"
                        alt="Ok icon"
                        className={styles['picturesSlider__aside-ok']}
                      />
                    </span>
                  </div>
                  <div className={styles['picturesSlider__aside-description']}>
                    {t('home.beTheFirst')}
                  </div>
                </div>
                <a
                  className={styles['picturesSlider__aside-action']}
                  href="#/phones/apple-iphone-14-128gb-purple"
                >
                  {t('home.orderNow')}
                </a>
              </div>
              <div className={styles['picturesSlider__container-image']}>
                {imageUrls.map((url, index) => (
                  <img
                    key={url}
                    src={url}
                    alt={t('home.slideAlt', { number: index + 1 })}
                    className={`${styles.picturesSlider__image} ${index === activeIndex ? styles['picturesSlider__image--active'] : ''}`}
                  />
                ))}
              </div>
            </div>
            <div
              className={styles.picturesSlider__button}
              onClick={() => changeSlide('right')}
            >
              <Icon name="arrow-right" />
            </div>
          </div>
          <div className={styles.picturesSlider__dots}>
            {imageUrls.map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${styles.picturesSlider__dot} ${index === activeIndex ? styles['picturesSlider__dot--active'] : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
