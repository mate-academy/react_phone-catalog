import { useState, useEffect } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [cardWidth, setCardWidth] = useState(272);
  const gapPixels = 16;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1200) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(4);
        setCardWidth(272);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveCarousel = (direction: 'left' | 'right') => {
    const cardsToMove = cardsPerPage;

    let newPosition;

    if (direction === 'left') {
      newPosition = carouselPosition - cardsToMove;
      newPosition = Math.max(newPosition, 0);
    } else {
      newPosition = carouselPosition + cardsToMove;
      newPosition = Math.min(newPosition, products.length - cardsPerPage);
    }

    setCarouselPosition(newPosition);
  };

  const isLeftButtonDisabled = carouselPosition === 0;

  const isRightButtonDisabled = carouselPosition
    + cardsPerPage >= products.length;

  const carouselStyle = {
    transform: `translateX(-${carouselPosition * (cardWidth + gapPixels)}px)`,
    transition: 'transform 0.5s ease',
  };

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <p className="product-slider__title title">{title}</p>

        <div className="product-slider__buttons">
          <button
            className={cn('button', {
              'button--disabled': isLeftButtonDisabled,
            })}
            type="button"
            aria-label="move-left"
            onClick={() => moveCarousel('left')}
            disabled={isLeftButtonDisabled}
          >
            <div
              className={cn('icon', 'icon-prev', {
                'icon-prev-disabled': isLeftButtonDisabled,
              })}
            />
          </button>

          <button
            className={cn('button', {
              'button--disabled': isRightButtonDisabled,
            })}
            type="button"
            aria-label="move-right"
            onClick={() => moveCarousel('right')}
            disabled={isRightButtonDisabled}
          >
            <div
              className={cn('icon', 'icon-next', {
                'icon-next-inactive': isRightButtonDisabled,
              })}
            />
          </button>
        </div>
      </div>

      <div className="product-slider__content" style={carouselStyle}>
        {products.map(product => {
          return (
            <ProductCard product={product} key={product.id} />
          );
        })}
      </div>
    </div>
  );
};
