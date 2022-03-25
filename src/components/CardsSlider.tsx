import classNames from 'classnames';
import { useState } from 'react';
import { ProductCard, Phone } from './ProductCard';

type Props = {
  favorite: string[],
  cart: string[],
  title: string,
  list: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const CardsSlider: React.FC<Props> = ({
  favorite,
  cart,
  title,
  list,
  handleCart,
  handleFavorite,
}) => {
  const [scroll, setScroll] = useState(0);
  const maxShift = (list.length - 3) * (288 - 16);

  return (
    <div className="cards-slider cards-slider--home">
      <div className="cards-slider__top-actions">
        <h2 className="cards-slider__title">{title}</h2>
        <div className="cards-slider__buttons-container">
          <button
            type="button"
            className={classNames('cards-slider__button cards-slider__button--left',
              { 'cards-slider__button--disabled': scroll === 0 })}
            onClick={() => {
              setScroll(scroll === 0 ? scroll : scroll + 288);
            }}
          >
            { }
          </button>
          <button
            type="button"
            className={classNames('cards-slider__button cards-slider__button--right',
              { 'cards-slider__button--disabled': scroll - 288 <= -maxShift })}
            onClick={() => {
              setScroll(scroll - 288 <= -maxShift ? scroll : scroll - 288);
            }}
          >
            { }
          </button>
        </div>
      </div>
      <div className="cards-slider__window">
        <div
          className="cards-slider__card-container"
          style={{ transform: `translateX(${scroll}px)` }}
        >
          {list.map((phone: Phone) => (
            <ProductCard
              key={phone.id}
              favorite={favorite}
              cart={cart}
              phone={phone}
              handleCart={handleCart}
              handleFavorite={handleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
