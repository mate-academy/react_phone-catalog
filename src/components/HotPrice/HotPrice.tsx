import { useState, useEffect, useRef } from 'react';
import styles from './HotPrice.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../Card';

const cardData = [1, 2, 3, 4, 5, 6, 7];

export const HotPrice = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardsContainerRef.current) {
        const cardElement = cardsContainerRef.current
          .children[0] as HTMLElement;

        if (cardElement) {
          const gap =
            parseFloat(getComputedStyle(cardsContainerRef.current).gap) || 0;

          setCardWidth(cardElement.offsetWidth + gap);
        }
      }
    };

    updateCardWidth();

    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex(prevIndex =>
      prevIndex === cardData.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  return (
    <section className={classNames(styles.hotPrice)} id="hotPrice">
      <div className={classNames(styles.hotPrice__topBar)}>
        <h3 className={classNames(styles.hotPrice__title)}>Hot prices</h3>
        <div className={classNames(styles.hotPrice__sliderButtons)}>
          <button
            className={classNames(styles.hotPrice__btn, {
              [styles['hotPrice__btn--disabled']]: activeIndex === 0,
            })}
            onClick={prevSlide}
            disabled={activeIndex === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={classNames(styles.hotPrice__btn, {
              [styles['hotPrice__btn--disabled']]:
                activeIndex === cardData.length - 1,
            })}
            onClick={nextSlide}
            disabled={activeIndex === cardData.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className={classNames(styles.hotPrice__cardsWrapper)}>
        <div
          className={classNames(styles.hotPrice__cards)}
          style={{
            transform: `translateX(-${activeIndex * cardWidth}px)`,
            transition: `transform 0.3s ease-in-out`,
          }}
          ref={cardsContainerRef}
        >
          {cardData.map((_, index) => (
            <div key={index} className={classNames(styles.hotPrice__card)}>
              <Card />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
