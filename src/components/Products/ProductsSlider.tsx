import { useContext, useState } from 'react';
import { WidthContext } from '../context/WidthContext';
import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[]
  title: string;
};

export const Slider: React.FC<Props> = ({ products, title }) => {
  const width = useContext(WidthContext);
  const [translateX, setTranslateX] = useState(0);

  const cardWidth = width > 480 ? 284 : 450;

  const getCardsCount = () => {
    if (width < 1120 && width > 480) {
      return 2;
    }

    if (width <= 480) {
      return 1;
    }

    return 4;
  };

  const showOnDesktop = cardWidth * getCardsCount();
  const maxWidthDesktop = cardWidth * (products.length - getCardsCount());

  const nextClick = () => {
    setTranslateX(Math.max(translateX - showOnDesktop, -maxWidthDesktop));
  };

  const prevClick = () => {
    setTranslateX(Math.min(translateX + showOnDesktop, 0));
  };

  return (
    <section className="slider">
      <div className="slider__header">
        <h1 className="slider__header__title">{title}</h1>

        <div className="slider__header__buttons">
          <button
            type="button"
            className="slider__header__buttons__button"
            onClick={prevClick}
            disabled={translateX === 0}
          >
            {'<'}
          </button>

          <button
            type="button"
            className="slider__header__buttons__button"
            onClick={nextClick}
            disabled={translateX === -maxWidthDesktop}
          >
            {'>'}
          </button>

        </div>
      </div>

      <div
        className="slider-content"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <ProductCard
          products={products}
        />
      </div>
    </section>
  );
};
