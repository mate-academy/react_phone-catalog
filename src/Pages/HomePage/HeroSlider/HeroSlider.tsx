// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from 'react-bootstrap';
import styles from './HeroSlider.module.scss';
import { useEffect, useState } from 'react';
import ArrowLeft from '../../../Icons/ChevronArrowLeft.svg?react';
import ArrowRight from '../../../Icons/ChevronArrowRight.svg?react';

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider}>
      <Carousel
        indicators={false}
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        prevIcon={
          <span className={styles['custom-prev']}>
            <ArrowLeft />
          </span>
        }
        nextIcon={
          <span className={styles['custom-next']}>
            <ArrowRight />
          </span>
        }
      >
        <Carousel.Item>
          <div
            className={`${styles.slider__img} ${styles['iphone-14']} ${'d-block w-100'}`}
          ></div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={`${styles.slider__img} ${styles['iphone-14']} ${'d-block w-100'}`}
          ></div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className={`${styles.slider__img} ${styles['iphone-14']} ${'d-block w-100'}`}
          ></div>
        </Carousel.Item>
      </Carousel>
      <div className={styles.slider__indicators}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className={`${styles.slider__dot} ${index === i ? styles['is-active'] : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
