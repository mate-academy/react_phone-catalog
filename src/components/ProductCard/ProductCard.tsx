/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Products';
import { ButtonAddCard } from '../ButtonAddCard/ButtonAddCard';
import { ButtonAddFavorite } from '../ButtonAddFavorite/ButtonAddFavorite';

type Props = {
  product: Product;
};

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId,
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
      <Link
        className="card"
        to={`/${product.category}/${phoneId}`}
      >
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
          <ButtonAddCard product={product} />
          <ButtonAddFavorite product={product} />
        </div>
      </Link>
    </>

  );
};
