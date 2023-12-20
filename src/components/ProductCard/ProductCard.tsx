/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import './ProductCard.scss';
import favoriteIcon from './ProductCardImg/Favourites (Heart Like).svg';
import { Product } from '../../types/Products';

type Props = {
  product: Product;
};

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <>
      <div className="card">
        <img
          src={`${BASE_URL}${image}`}
          alt="image__phone"
          className="card__img"
        />

        <div className="card__title">
          {name}
        </div>
        <div className="card__price">
          ${price}
          <span>
            ${fullPrice}
          </span>
        </div>

        <div className="card__properties">
          <div className="card__properties-names">
            <div className="card__properties-name">Screen</div>
            <div className="card__properties-name">Capacity</div>
            <div className="card__properties-name">RAM</div>
          </div>
          <div className="card__properties-values">
            <div className="card__properties-value">{screen}</div>
            <div className="card__properties-value">{capacity}</div>
            <div className="card__properties-value">{ram}</div>
          </div>
        </div>

        <div className="card__button">
          <button
            className="card__button-add"
            type="button"
          >
            Add to card
          </button>
          <button
            className="card__button--favorite"
            type="button"
          >
            <img src={favoriteIcon} alt="heart" className="card__button--favorite-img" />
          </button>
        </div>
      </div>
    </>

  );
};
