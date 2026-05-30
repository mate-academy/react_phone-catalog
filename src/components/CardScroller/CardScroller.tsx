import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './CardScroller.module.scss';
import arrowRight from '../../assets/Icons/Arrow-right.svg';
import arrowLeft from '../../assets/Icons/Arrow-left.svg';
import { ProductList } from '../ProductList/ProductList';
import { DeviceShort } from '../../types/DeviceShort';

type Props = {
  items: DeviceShort[];
  name: string;
};

export const CardScroller: React.FC<Props> = ({ items, name }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const cardWidth =
    windowSize.width < 640 ? 212 : windowSize.width < 1200 ? 237 : 272;
  const step = windowSize.width < 1200 ? 1 : 4;
  const gap = 16;

  const scrollerStyles = {
    transform: `translateX(-${currentSlide * (cardWidth + gap)}px)`,
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (items[prev + step] ? prev + step : 0));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (items[prev - step] ? prev - step : 0));
  };

  const title = () => {
    switch (name) {
      case 'new':
        return 'Brand new models';
      case 'discounts':
        return 'Hot prices';
      case 'recommend':
        return 'You might also like';
      default:
        return 'Our devices';
    }
  };

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="componentContainer">
        <div className={classNames(styles.scroller, 'inlineContainer')}>
          <h2>{title()}</h2>
          <div className={styles.scroller__buttons}>
            <button
              className={styles.scroller__button}
              onClick={() => prevSlide()}
            >
              <img className={styles.arrow} src={arrowLeft} alt="arowLeft" />
            </button>
            <button
              className={styles.scroller__button}
              onClick={() => nextSlide()}
            >
              <img className={styles.arrow} src={arrowRight} alt="arowRight" />
            </button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <div className={classNames(styles.cards)} style={scrollerStyles}>
            <ProductList items={items} />
          </div>
        </div>
      </div>
    </>
  );
};
