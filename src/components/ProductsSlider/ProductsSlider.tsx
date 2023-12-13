import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';

type Props = {
  product: Product[]
  title: string
};

const cardWidth = 272;
const cardGap = 16;
const cardsCount = 4;
let newCard;

export const ProductsSlider: React.FC<Props> = ({ product, title }) => {
  const [visibleCard, setVisibleCard] = useState(cardsCount);

  const scroll = -(visibleCard - cardsCount) * (cardWidth + cardGap);
  const totalCards = product.length;

  const handleNext = () => {
    newCard = visibleCard + 4;

    if (newCard > totalCards) {
      newCard = totalCards;
    }

    setVisibleCard(newCard);
  };

  const handlePrev = () => {
    newCard = visibleCard - 4;

    if (newCard < cardsCount) {
      newCard = cardsCount;
    }

    setVisibleCard(newCard);
  };

  return (
    <div className="slid">
      <div className="slid__top">
        <h1 className="slid__title">{title}</h1>

        <div className="slid__buttons">
          <button
            className="slid__button"
            type="button"
            onClick={handlePrev}
            disabled={visibleCard <= cardsCount}
          >
            <img
              src="img/mine/icons/Arrow Left.svg"
              alt="arrow"
              className="slid__button--img"
            />
          </button>

          <button
            className="slid__button"
            type="button"
            onClick={handleNext}
            disabled={visibleCard === totalCards}
          >
            <img
              src="img/mine/icons/Arrow Right.svg"
              alt="arrow"
              className="slid__button--img
            "
            />
          </button>
        </div>
      </div>

      <div
        className="slid__card"
        style={{
          transform: `translateX(${scroll}px)`,
          transition: 'transform 1s',
        }}
      >
        {product.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
          />
        ))}
      </div>
    </div>
  );
};
