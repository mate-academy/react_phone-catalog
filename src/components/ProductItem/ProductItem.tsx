import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import './productItem.scss';

interface Props {
  product: Product;
}

export const ProductItem: FC<Props> = ({ product }) => {
  const {
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="product">
      <Link className="product__link" to={`/${category}`}>
        <img className="product__image" src={`_new/${image}`} alt="Phone" />
        <h2 className="product__name">{name}</h2>
      </Link>

      <div className="product__prices">
        <p className="product__price">{`$${price}`}</p>
        <p className="product__full-price">{`$${fullPrice}`}</p>
      </div>

      <div className="product__info">
        <div className="product__info-block">
          <p className="product__info-title">Screen</p>
          <p className="product__info-value">{screen}</p>
        </div>
        <div className="product__info-block">
          <p className="product__info-title">Capacity</p>
          <p className="product__info-value">{capacity}</p>
        </div>
        <div className="product__info-block">
          <p className="product__info-title">RAM</p>
          <p className="product__info-value">{ram}</p>
        </div>
      </div>

      <div className="product__buttons">
        <button className="product__add-to-card">
          Add to card
        </button>
        <button className="product__liked">
          <img src="/_new/img/icons/favorites-icon.svg" alt="Add to favorite" />
        </button>
      </div>
    </div>
  );
};
