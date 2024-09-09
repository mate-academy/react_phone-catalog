import React, { useContext, useEffect, useRef, useState } from 'react';
import './NewItems.scss';
import { Cart } from '../Cart/Cart';
import { ProductsContext } from '../../context/ProductContexts';
import { Product } from '../../types';
interface NewItemsProps {
  product: Product[];
  title: string;
  showDiscount: boolean;
}

export const NewItems: React.FC<NewItemsProps> = ({
  product,
  title,
  showDiscount,
}) => {
  const { updateGoods } = useContext(ProductsContext);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch('/api/phones.json')
      .then((response) => response.json())
      .then((data) => updateGoods(data));
  }, [updateGoods]);

  const updateCardWidth = () => {
    if (cardsRef.current) {
      const containerWidth = cardsRef.current.offsetWidth;
      const gapStyle = getComputedStyle(cardsRef.current).gap;
      const gap = parseInt(gapStyle, 10) || 0;

      const imageElement = document.querySelector(
        '.cart__image',
      ) as HTMLImageElement;
      const cardElement = imageElement?.closest(
        '.cart__wrapper',
      ) as HTMLDivElement;

      if (cardElement) {
        const newCardWidth = cardElement.offsetWidth + gap;
        setCardWidth(newCardWidth);
        const newCardsPerPage = Math.floor(
          (containerWidth + gap) / newCardWidth,
        );
        setCardsPerPage(newCardsPerPage);
      }
    }
  };

  useEffect(() => {
    updateCardWidth();
  }, [startIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateCardWidth();

      const maxIndex = Math.max(0, product.length - cardsPerPage);
      if (startIndex > maxIndex) {
        setStartIndex(maxIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [startIndex, cardsPerPage, product.length]);

  const maxIndex = Math.max(0, product.length - cardsPerPage);
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxIndex;

  const nextPage = () => {
    if (canNext) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevPage = () => {
    if (canPrev) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleTransform = () => {
    return `translateX(-${startIndex * cardWidth}px)`;
  };

  return (
    <div className="cartItem">
      <div className="cartItem__wrapper">
        <div className="cartItem__top">
          <h2 className="cartItem__title">{title}</h2>
          <div className="cartItem__slider">
            <button
              className="cartItem__slider--left"
              disabled={!canPrev}
              onClick={prevPage}
            >
              <img
                src="../img/icons/SliderButtonDefault(right).svg"
                alt="arrowLeft"
              />
            </button>
            <button
              className="cartItem__slider--right"
              disabled={!canNext}
              onClick={nextPage}
            >
              <img
                src="../img/icons/SliderButtonDefault(right).svg"
                alt="arrowRight"
              />
            </button>
          </div>
        </div>
        <div className="cartItem__content">
          <div
            ref={cardsRef}
            className="cartItem__cards"
            style={{
              transform: handleTransform(),
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {product.map((item) => (
              <div key={item.id} className="cartItem__card">
                <Cart product={item} showDiscount={showDiscount} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
