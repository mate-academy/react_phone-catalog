import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ToCardButton } from '../UI/ToCardButton/ToCardButton';
import { ToFavoritesButton } from '../UI/ToFavoritesButton/ToFavoritesButton';
import './Product.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const {
    id,
    imageUrl,
    name,
    type,
    price,
    discountSum,
    screen,
    capacity,
    ram,
  } = product;

  const basePath = useMemo(() => {
    switch (type) {
      case 'phone':
        return 'phones';

      case 'tablet':
        return 'tablets';

      default:
        return 'accessories';
    }
  }, [type]);

  return (
    <div className="product" data-cy="cardsContainer">
      <img
        src={imageUrl}
        alt="product-img"
        className="product__img"
      />
      <div className="product__header">
        <Link to={`/${basePath}/${id}`} className="product__title">
          {name}
        </Link>
        <div className="product__price">
          {discountSum !== undefined ? (
            <>
              <span className="product__price-current">{`$${price - discountSum}`}</span>
              <span className="product__price-full">{`$${price}`}</span>
            </>
          ) : (
            <span className="product__price-current">{`$${price}`}</span>
          )}
        </div>
      </div>
      <div className="product__details">
        <div className="product__info">
          <span className="product__info-title">Screen</span>
          <span className="product__info-description">{screen}</span>
        </div>
        <div className="product__info">
          <span className="product__info-title">Capacity</span>
          <span className="product__info-description">{capacity}</span>
        </div>
        <div className="product__info">
          <span className="product__info-title">RAM</span>
          <span className="product__info-description">{ram}</span>
        </div>
      </div>
      <div className="product__buttons">
        <ToCardButton
          width="176px"
          height="40px"
          currentProduct={product}
        />
        <ToFavoritesButton width="40px" height="40px" />
      </div>
    </div>
  );
};
