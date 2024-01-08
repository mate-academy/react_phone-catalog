import { Link } from 'react-router-dom';
import './ProductCard.scss';

import { AddToFavButton } from '../AddToFavButton/AddToFavButton';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../helpers/constants';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId, name, price, fullPrice, screen, capacity, ram, image,
  }
    = product;

  return (
    <Link
      to={`/${product.category}/${phoneId}`}
      className="ProductCard"
      data-cy="cardsContainer"
    >
      <div className="ProductCard__photo">
        <img
          src={`${BASE_URL}${image}`}
          alt="Product"
          className="ProductCard__photo-item"
        />
      </div>

      <div className="ProductCard__title">
        <h4 className="ProductCard__title-item">{name}</h4>
      </div>

      <div className="ProductCard__price">
        <span className="ProductCard__price-current">{`$${price}`}</span>

        <span className="ProductCard__price-before">{`$${fullPrice}`}</span>
      </div>

      <div className="ProductCard__info">
        <div className="ProductCard__info-container">
          <span className="ProductCard__info-title">Screen</span>
          <span className="ProductCard__info-specification">{screen}</span>
        </div>

        <div className="ProductCard__info-container">
          <span className="ProductCard__info-title">Capacity</span>
          <span className="ProductCard__info-specification">{capacity}</span>
        </div>

        <div className="ProductCard__info-container">
          <span className="ProductCard__info-title">RAM</span>
          <span className="ProductCard__info-specification">{ram}</span>
        </div>
      </div>

      <div className="ProductCard__buttons">
        <AddToCartButton product={product} />
        <AddToFavButton product={product} />
      </div>
    </Link>
  );
};
