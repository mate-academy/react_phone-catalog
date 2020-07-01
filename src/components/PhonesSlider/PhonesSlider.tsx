import React, { useState } from 'react';
import cn from 'classnames';
import PhoneCard from '../PhoneCard/PhoneCard';
import './PhoneSlider.scss';

type Props = {
  title: string;
  products: Products[];
};

export const PhonesSlider: React.FC<Props> = ({ title, products }) => {
  const [cardPosition, setCardPosition] = useState(0);

  const cardWidthWithPad = 288;
  const maxWidth = cardWidthWithPad * (products.length - 4);

  const handleNextClick = () => {
    if (cardPosition !== -maxWidth) {
      setCardPosition(cardPosition - cardWidthWithPad);
    }
  };

  const handlePrevClick = () => {
    if (cardPosition !== 0) {
      setCardPosition(cardPosition + cardWidthWithPad);
    }
  };

  const carouselStyle = {
    transform: `translateX(${cardPosition}px)`,
  };

  return (
    <section className="section">
      <div className="container">
        <div className="container__top">
          <h2 className="container__title">{title}</h2>

          <div className="buttons">
            <button
              type="button"
              onClick={handlePrevClick}
              disabled={cardPosition === 0}
              className={cn('PhoneSlider__btn',
                'carousel__btn',
                'carousel__btn_prev',
                'btn',
                {
                  btn__noactive_prev: cardPosition === 0,
                })}
            >
              { }
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              disabled={cardPosition === -maxWidth}
              className={cn('PhoneSlider__btn',
                'carousel__btn',
                'carousel__btn_next',
                'btn',
                {
                  btn__noactive_next: cardPosition === -maxWidth,
                })}
            >
              { }
            </button>
          </div>
        </div>

        <div className="PhoneSlider__container">
          <ul className="carousel" style={carouselStyle}>
            {products.map((phone) => (
              <li
                className="PhoneSlider__item carousel__item"
                key={phone.id}
              >
                <PhoneCard phone={phone} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
