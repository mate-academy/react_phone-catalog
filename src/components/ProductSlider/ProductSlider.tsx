import { useEffect, useState } from 'react';
import './ProductSlider.scss';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);
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

  const slide = (direction: 'left' | 'right') => {
    const cardsToSlide = cardsPerPage;

    let newPosition;

    if (direction === 'left') {
      newPosition = position - cardsToSlide;
      newPosition = Math.max(newPosition, 0);
    } else {
      newPosition = position + cardsToSlide;
      newPosition = Math.min(newPosition, products.length - cardsPerPage);
    }

    setPosition(newPosition);
  };

  const isLeftButtonDisabled = position === 0;
  const isRightButtonDisabled = position + cardsPerPage >= products.length;

  const sliderStyle = {
    transform: `translateX(-${position * (cardWidth + gapPixels)}px)`,
    transition: 'transform 0.5s ease',
  };

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <p className="product-slider__title title">{title}</p>

        <div className="product-slider__buttons">
          <button
            className={classNames('button', {
              'button--disabled': isLeftButtonDisabled,
            })}
            type="button"
            aria-label="move-left"
            onClick={() => slide('left')}
            disabled={isLeftButtonDisabled}
          >
            <div
              className={classNames('icon', 'icon-prev', {
                'icon-prev-disabled': isLeftButtonDisabled,
              })}
            />
          </button>

          <button
            className={classNames('button', {
              'button--disabled': isRightButtonDisabled,
            })}
            type="button"
            aria-label="move-right"
            onClick={() => slide('right')}
            disabled={isRightButtonDisabled}
          >
            <div
              className={classNames('icon', 'icon-next', {
                'icon-next-inactive': isRightButtonDisabled,
              })}
            />
          </button>
        </div>
      </div>

      <div className="product-slider__content" style={sliderStyle}>
        {products.map(product => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};
