import React from 'react';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import arrowDisabled from '../../images/icons/arrow_disabled_right.svg';
import { ProductCard } from '../ProductCard';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';

import './Slider.scss';

type Props = {
  products: Product[];
  discount?: boolean;
  title: string;
  slash?: boolean | undefined;
};

export const Slider: React.FC<Props> = React.memo(
  ({ products, discount, title, slash }) => {
    const firstCardIndex = 0;
    const lastCardIndex = products.length - 1;

    const card = useRef<HTMLLIElement>(null);

    const [cardWidth, setCardWith] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(firstCardIndex);

    const CARD_GAP = 16;
    const CARD_BLOCK = cardWidth + CARD_GAP;

    const transformValue = CARD_BLOCK * currentCardIndex;

    const { theme } = useAppSelector(state => state.theme);

    const handleRightClick = () => {
      if (currentCardIndex === lastCardIndex) {
        return;
      } else {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    };

    const handleLeftClick = () => {
      if (currentCardIndex === firstCardIndex) {
        return;
      } else {
        setCurrentCardIndex(currentCardIndex - 1);
      }
    };

    useEffect(() => {
      if (card.current) {
        setCardWith(card.current.offsetWidth);
      }
    }, [currentCardIndex]);

    return (
      <div className="Slider">
        <div className="Slider__container">
          <div className="Slider__content">
            <div className="Slider__top">
              <h2 className="Slider__title">{title}</h2>
              <div className="Slider__buttons">
                <button
                  className={classNames('Slider__button Slider__button-left', {
                    'Slider__button Slider__button-left-disabled':
                      currentCardIndex === firstCardIndex,
                  })}
                  onClick={handleLeftClick}
                >
                  <img
                    src={
                      currentCardIndex === firstCardIndex
                        ? arrowDisabled
                        : theme === 'light-theme'
                          ? arrow
                          : arrowDark
                    }
                    alt="Arrow-left"
                    className="Slider__button--leftImg"
                  />
                </button>
                <button
                  className={classNames(
                    'Slider__button Slider__button--right',
                    {
                      'Slider__button-right-disabled':
                        lastCardIndex === currentCardIndex,
                    },
                  )}
                  onClick={handleRightClick}
                >
                  <img
                    src={theme === 'light-theme' ? arrow : arrowDark}
                    alt="Arrow-right"
                  />
                </button>
              </div>
            </div>

            <div className="Slider__cardsBlock">
              <ul
                className="Slider__productCards"
                style={{ transform: `translateX(-${transformValue}px)` }}
              >
                {products.map(product => (
                  <li
                    key={product.id}
                    ref={card}
                    className="Slider__productCards-item"
                  >
                    <ProductCard
                      product={product}
                      discount={discount}
                      slash={slash}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Slider.displayName = 'Slider';
