/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  product: Product[];
};

const ProductSlider: React.FC<Props> = ({ title, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setVisibleCardsCount(1);
    } else if (width >= 640 && width < 1200) {
      setVisibleCardsCount(2);
    } else {
      setVisibleCardsCount(4);
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, product.length - visibleCardsCount),
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === product.length - visibleCardsCount;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
    trackMouse: true,
  });

  return (
    <div className="hot margin__top details__also">
      <div className="hot__top">
        <h1 className="hot__title">{title}</h1>

        <div className="hot__block">
          <button
            className="hot__button hot__button-left"
            onClick={handlePrevClick}
            disabled={isPrevDisabled}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hot__button-svg hot__button-svg--left"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="15.5"
                stroke="#B4BDC4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5288 11.5286C13.7891 11.2683 14.2112 11.2683 14.4716 11.5286L18.4716 15.5286C18.7319 15.789 18.7319 16.2111 18.4716 16.4714L14.4716 20.4714C14.2112 20.7318 13.7891 20.7318 13.5288 20.4714C13.2684 20.2111 13.2684 19.789 13.5288 19.5286L17.0574 16L13.5288 12.4714C13.2684 12.2111 13.2684 11.789 13.5288 11.5286Z"
                fill="#0F0F11"
              />
            </svg>
          </button>

          <button
            className="hot__button hot__button-right"
            onClick={handleNextClick}
            disabled={isNextDisabled}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hot__button-svg hot__button-svg--right"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="15.5"
                stroke="#B4BDC4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5288 11.5286C13.7891 11.2683 14.2112 11.2683 14.4716 11.5286L18.4716 15.5286C18.7319 15.789 18.7319 16.2111 18.4716 16.4714L14.4716 20.4714C14.2112 20.7318 13.7891 20.7318 13.5288 20.4714C13.2684 20.2111 13.2684 19.789 13.5288 19.5286L17.0574 16L13.5288 12.4714C13.2684 12.2111 13.2684 11.789 13.5288 11.5286Z"
                fill="#0F0F11"
              />
            </svg>
          </button>
        </div>
      </div>

      <div {...swipeHandlers} className="hot__list">
        {product.map(item => (
          <div
            className="hot__div"
            key={item.id}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
            }}
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
