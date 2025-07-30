import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './slider.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';

export const Slider = () => {
  const slides = [
    {
      title: 'IPhone 14 Pro',
      subtitle: 'And then was a Pro',
      path: 'phones/apple-iphone-14-pro-128gb-spaceblack',
      image: './img/phones/apple-iphone-14-pro/spaceblack/04.webp',
    },
    {
      title: 'IPad Pro 11',
      subtitle: 'Powerful Performance',
      path: 'tablets/apple-ipad-pro-11-2021-2tb-silver',
      image: './img/tablets/apple-ipad-pro-11-2021/silver/00.webp',
    },
    {
      title: 'Watch Series 6',
      subtitle: 'Track your daily activity',
      path: 'apple-watch-series-3-38mm-gold',
      image: './img/accessories/apple-watch-series-3/gold/01.webp',
    },
  ];

  const isMobile = useMediaQuery({ maxWidth: 639 });
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => setCurrent(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const previousImg = () => {
    const newIndex = current > 0 ? current - 1 : slides.length - 1;

    setCurrent(newIndex);
  };

  const nextImg = () => {
    const newIndex = current < slides.length - 1 ? current + 1 : 0;

    setCurrent(newIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {!isMobile && (
          <button
            className={`${styles.arrow} ${styles['arrow--align']}`}
            onClick={previousImg}
          >
            <Icon icon={icons.arrowLeft} />
          </button>
        )}
        <div className={styles.slide}>
          {isMobile ? (
            <p className={styles.caption}>
              Now available
              <br />
              in our store!
            </p>
          ) : (
            <div className={styles.textBlock}>
              <div className={styles.captionBlock}>
                <p className={styles.caption}>
                  Now available
                  <br />
                  in our store!
                  <img
                    src="/img/icons/favicon.png"
                    alt="okHand"
                    className={styles.captionImg}
                  />
                </p>
                <p className={styles.subtitle}>Be the first!</p>
              </div>
              <Link to="/" className={styles.sliderButton}>
                Order now
              </Link>
            </div>
          )}
          <div className={styles.sliderTitleBlock}>
            <h2 className={styles.title}>{slides[current].title}</h2>
            <p className={styles.subtitle}>{slides[current].subtitle}</p>
            <div className={styles.slideImgBox}>
              <img
                src={slides[current].image}
                alt="slide"
                className={styles.slideImg}
              />
            </div>
          </div>
        </div>
        {!isMobile && (
          <button className={styles.arrow} onClick={nextImg}>
            <Icon icon={icons.arrowRight} />
          </button>
        )}
        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={classNames(styles.dot, {
                [styles.active]: current === idx,
              })}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
