import { useEffect, useRef, useState } from 'react';
import { CardList } from '../../../../shared/components/CardList';
import { ProductPage } from '../../../../shared/types/ProductPage';
import classNames from 'classnames';

import './Cards.scss';

export const Cards = ({
  items,
  title,
  isFullPrice,
}: {
  items: ProductPage[];
  title: string;
  isFullPrice: boolean;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);
  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollPosition >= maxScroll - 10;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) {
      return;
    }

    const scrollAmount = window.innerWidth >= 1200 ? 287 : 226;

    if (direction === 'left') {
      scrollContainerRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleScrollEvent = () => {
    if (scrollContainerRef.current) {
      const current = scrollContainerRef.current.scrollLeft;
      const max =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;

      setScrollPosition(current);
      setMaxScroll(max);
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      handleScrollEvent();
    });
  }, [items]);

  return (
    <>
      <section className="new-models grid">
        <div className="new-models-top grid">
          <h4 className="home-section-title ">{title} </h4>
          <div className="controllers">
            <button
              className={classNames('prev-btn', {
                'disabled-btn': isAtStart,
              })}
              onClick={() => handleScroll('left')}
              disabled={isAtStart}
            ></button>

            <button
              className={classNames('next-btn', {
                'disabled-btn-without-rotate': isAtEnd,
              })}
              onClick={() => handleScroll('right')}
              disabled={isAtEnd}
            ></button>
          </div>
        </div>
        <div
          className="new-brand grid"
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
        >
          <CardList productsList={items} isFullPrice={isFullPrice} />
        </div>
      </section>
    </>
  );
};
