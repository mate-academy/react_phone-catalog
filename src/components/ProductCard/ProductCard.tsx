import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { AddToLike } from '../AddToLike';
import { AddToCart } from '../AddToCart';

import './ProductCard.scss';

interface Props {
  phone: Product;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const path = `/${phone.type}s/${phone.id}`;

  const addToCartStyles = {
    width: '176px',
    height: '40px',
  };

  const addToLikeStyles = {
    width: '40px',
    height: '40px',
  };

  return (
    <Link
      to={path}
      className="card"
      data-cy="cardsContainer"
    >
      <img
        className="card__img"
        src={phone.imageUrl}
        alt={phone.name}
      />
      <div className="card__description">
        <h2 className="card__title">
          {phone.name}
        </h2>
        <p className="card__price">
          {`$${phone.price} `}
          <span className="card__price--discount">
            {`$${phone.price + phone.discount}`}
          </span>
        </p>
      </div>
      <div className="card__details">
        <div className="card__detail Screen">
          <div>Screen</div>
          <div className="card__detail-value">{phone.screen}</div>
        </div>
        <div className="card__detail Capacity">
          <div>Capacity</div>
          <div className="card__detail-value">{phone.capacity}</div>
        </div>
        <div className="card__detail">
          <div>RAM</div>
          <div className="card__detail-value">{phone.ram}</div>
        </div>
      </div>
      <div className="card__link">
        <AddToCart product={phone} styles={addToCartStyles} />
        <AddToLike product={phone} styles={addToLikeStyles} />
      </div>
    </Link>
  );
};
