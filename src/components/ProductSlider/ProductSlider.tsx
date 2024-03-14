import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';

type Props = {
  products: Product[];
  name: string;
  isLoaded: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  name,
  isLoaded,
}) => {
  const cardWidth = 288;
  const cardsToShow = 4;
  const [carousel, setCarousel] = useState(0);
  const remainingCards = Math.max(0, products.length - cardsToShow);
  const LAST_TRANSLATE = -(cardWidth * remainingCards);

  const handleSpinToLeft = () => {
    setCarousel(Math.min(carousel + (cardWidth * cardsToShow), 0));
  };

  const handleSpinToRight = () => {
    setCarousel(Math.max(carousel - (cardWidth * cardsToShow), LAST_TRANSLATE));
  };

  if (isLoaded) {
    return (
      <div className="productSlider">
        <div className="productSlider__block">
          <div className="productSlider__block--title bold">
            {name}
          </div>
          <div className="productSlider__carousel">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productSlider">
      <div className="productSlider__block">
        <div className="productSlider__block--title bold">
          {name}
        </div>
        <div className="productSlider__block--buttons">
          <button
            type="button"
            className="productSlider__block--button"
            onClick={() => handleSpinToLeft()}
            disabled={carousel === 0}
          >
            <div
              className="arrow arrow-left"
              style={carousel === 0
                ? { backgroundImage: `url(${process.env.PUBLIC_URL}/icons/ArrowLeftDisabled.svg)` }
                : {}}
            />
          </button>
          <button
            type="button"
            className="productSlider__block--button"
            onClick={() => handleSpinToRight()}
            disabled={carousel === LAST_TRANSLATE}
          >
            <div
              className="arrow arrow-right"
              style={carousel === LAST_TRANSLATE
                ? { backgroundImage: `url(${process.env.PUBLIC_URL}/icons/ArrowRightDisabled.svg)` }
                : {}}
            />
          </button>
        </div>
      </div>
      <div className="productSlider__carousel">
        {products.map((product) => {
          return (
            <div
              key={product.id}
            >
              <ProductCard
                data-cy="cardsContainer"
                product={product}
                carousel={carousel}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
