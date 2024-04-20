/* eslint-disable max-len */
import React from 'react';
import './CardsCarusel.scss';
import { Card } from '../Card/Card';
import { Products } from '../../../type/Products';

interface Props {
  props: Products[];
  discount?: boolean;
  carusel?: boolean;
  amount?: number;
}

export const CardsCarusel: React.FC<Props> = ({
  props,
  discount = false,
  carusel = true,
  amount = 4,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [...props];

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      return (prevIndex + amount) % cards.length;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      return (prevIndex - amount + cards.length) % cards.length;
    });
  };

  return (
    <div className="mt-2">
      <div className="w-11">
        <div className="relative">
          {carusel && (
            <div className="carusel-buttons">
              <button
                className="carusel-button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className="carusel-button"
                onClick={handleNext}
                disabled={
                  currentIndex + amount === cards.length || props.length < 4
                }
              >
                &gt;
              </button>
            </div>
          )}
          <div className="carusel-cards">
            {cards
              .slice(currentIndex, currentIndex + amount)
              .map((product, index) => (
                <Card key={index} product={product} discount={discount} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
