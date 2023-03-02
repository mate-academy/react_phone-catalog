import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types/Product';
import { CartButton } from './CartButton';
import { LikeButton } from './LikeButton';
import '../styles/productsSlider.scss';

type Props = {
  product: Product,
};

export const ProductCard: FC<Props> = ({ product }) => {
  const currentPrice
    = product.price - ((product.price / 100) * product.discount);

  return (
    <div
      className="products-slider__item"
      data-cy="cardsContainer"
    >
      <NavLink
        to={`/${product.type}s/${product.id}`}
        className="products-slider__item-link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <i className="fa-solid fa-crosshairs" />
      </NavLink>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="products-slider__item-image"
      />
      <h2 className="products-slider__item-title">
        {product.name}
      </h2>
      <p className="products-slider__item-price">
        <span className="products-slider__item-current-price">
          {`$${currentPrice}`}
        </span>
        {product.price !== currentPrice && (
          <span className="products-slider__item-old-price">
            {`$${product.price}`}
          </span>
        )}
      </p>
      <div className="products-slider__item-info">
        <p className="products-slider__item-info-text">
          Screen
          <span>{product.screen || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          Capacity
          <span>{product.capacity || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          RAM
          <span>{product.ram || '-'}</span>
        </p>
      </div>
      <div className="products-slider__item-buttons">
        <CartButton product={product} />
        <LikeButton id={product.id} product={product} />
      </div>
    </div>
  );
};
