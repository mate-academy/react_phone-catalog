import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './Carousel.module.scss';
import { CarouselProduct } from '../../types/Product';

type Props = {
  cards: CarouselProduct[];
  title: string;
};

export const Carousel: React.FC<Props> = ({ cards, title }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollWay = 288;

      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollWay : scrollWay,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScroll();
  }, [cards]);

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__header}>
        <h2 className={styles.carousel__title}>{title}</h2>
        <div className={styles.carousel__buttons}>
          <button
            className={styles.carousel__button}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/arrow-to-left.svg`}
              alt="Back"
            ></img>
          </button>
          <button
            className={styles.carousel__button}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/arrow-to-right.svg`}
              alt="Forward"
            ></img>
          </button>
        </div>
      </div>
      <div
        className={styles.carousel__cards}
        ref={carouselRef}
        onScroll={checkScroll}
      >
        {cards.map(card => (
          <div key={card.id} className={styles.carousel__card_wrapper}>
            <ProductCard
              key={card.id}
              id={card.id}
              img={card.img}
              category={card.category}
              name={card.name}
              capacity={card.capacity}
              priceRegular={card.priceRegular}
              priceDiscount={card.priceDiscount}
              ram={card.ram}
              screen={card.screen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
