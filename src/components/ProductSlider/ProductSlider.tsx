/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductSlider.scss';
import { Product } from '../../types/productType';
import { Card } from '../Card/Card';
import { CartItem } from '../../types/cartType';

type Props = {
  products: Product[],
  title: string,
  step: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  step,
  itemWidth,
  animationDuration,
  infinite,
  setFavorites,
  favorites,
  cartItems,
  setCartItems,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [visibleCardCount, setVisibleCardCount] = useState(4);
  const prevDisable = currentIndex === 0 && !infinite;
  const nextDisable
    = currentIndex === products.length - visibleCardCount && !infinite;
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeDetailsId = (id: string) => (
    navigate(`${location.pathname.slice(0, location.pathname.lastIndexOf('/'))}/${id}`)
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 630) {
        setVisibleCardCount(1);
      } else if (windowWidth < 990) {
        setVisibleCardCount(2);
      } else if (windowWidth < 1170) {
        setVisibleCardCount(3);
      } else {
        setVisibleCardCount(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextButton = () => {
    const lastIndex = products.length - visibleCardCount;

    setCurrentIndex((prevIndex) => (
      prevIndex + step > lastIndex ? lastIndex : prevIndex + step
    ));

    if (currentIndex === lastIndex && infinite) {
      setCurrentIndex(0);
    }
  };

  const prevButton = () => {
    const lastIndex = products.length - visibleCardCount;

    setCurrentIndex((prevIndex) => (
      prevIndex - step > 0 ? prevIndex - step : 0
    ));

    if (currentIndex === 0 && infinite) {
      setCurrentIndex(lastIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      nextButton();
    } else if (touchEndX - touchStartX > 50) {
      prevButton();
    }
  };

  useEffect(() => {
    const carousel = document.querySelector('.product-slider');

    if (carousel) {
      carousel.addEventListener('touchstart', (e) => (
        handleTouchStart(e as unknown as React.TouchEvent)
      ), {
        passive: false,
      });
      carousel.addEventListener('touchmove', (e) => (
        handleTouchMove(e as unknown as React.TouchEvent)
      ), {
        passive: false,
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('touchstart', () => handleTouchStart);
        carousel.removeEventListener('touchmove', () => handleTouchMove);
      }
    };
  }, []);

  useEffect(() => {
    const carousel = document.querySelector('.product-slider');

    if (carousel) {
      carousel.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('touchstart', () => handleTouchStart);
        carousel.removeEventListener('touchmove', () => handleTouchMove);
        carousel.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchEndX]);

  return (
    <div
      className="product-slider"
      style={{
        width: `${itemWidth * visibleCardCount - 14}px`,
      }}
    >
      <div className="product-slider__controls">
        <h1 className="product-slider__title title">
          {title}
        </h1>
        {visibleCardCount > 1 && (
          <div className="product-slider__buttons">
            <button
              className={classNames('product-slider__button button', {
                'product-slider__button--disabled': prevDisable,
              })}
              type="button"
              onClick={prevButton}
              disabled={prevDisable}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill={prevDisable ? 'rgba(226, 230, 233, 1)' : '#313237'} />
              </svg>
            </button>
            <button
              className={classNames('product-slider__button button', {
                'product-slider__button--disabled': nextDisable,
              })}
              type="button"
              onClick={nextButton}
              data-cy="next"
              disabled={nextDisable}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill={nextDisable ? 'rgba(226, 230, 233, 1)' : '#313237'} />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ul className="product-slider__list" data-cy="cardsContainer">
        {products.map((product) => (
          <li
            className="Carousel__list-item"
            key={product.id}
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <Card
              key={product.id}
              itemId={product.itemId}
              image={product.image}
              title={product.name}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              fullPrice={title === 'Brand new models' ? 0 : product.fullPrice}
              setFavorites={setFavorites}
              favorites={favorites}
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleChangeDetailsId={handleChangeDetailsId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
