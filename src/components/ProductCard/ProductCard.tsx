import {
  FC,
  useContext,
} from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { NavbarContext } from '../../context/NavbarContext';
import { getFinalPrice } from '../../helpers/getFinalPrice';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const modifiedImageUrl = product.imageUrl.replace('phones', 'products');
  const [searchParams] = useSearchParams();
  const {
    handleAddToCartFn,
    handleLikeFn,
  } = useContext(NavbarContext);

  const {
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    id,
  } = product;

  return (
    <Link
      className="card__link card--margin-vertical"
      to={{
        pathname: `/product/${id}`,
        search: searchParams.toString(),
      }}
    >
      <div className="card">
        <img className="card__img" src={modifiedImageUrl} alt="device" />

        <h2 className="card__title">{name}</h2>

        <div className="card__price">
          {getFinalPrice(price, discount) === price ? (
            <span className="card__price-discount">{`$${price}`}</span>
          ) : (
            <>
              <span className="card__price-discount">
                {`$${getFinalPrice(price, discount)}`}
              </span>
              <span className="card__price-amount">{`$${price}`}</span>
            </>
          )}
        </div>

        <div className="card__line" />

        <div className="card__description">
          <div className="card__description-about">
            <span className="about">Screen</span>
            <span className="about-description">{screen}</span>
          </div>

          <div className="card__description-about">
            <span className="about">Capacity</span>
            <span className="about-description">{capacity}</span>
          </div>

          <div className="card__description-about">
            <span className="about">RAM</span>
            <span className="about-description">{ram}</span>
          </div>
        </div>
        <div className="card__button-wrapper">
          {!localStorage.getItem(`addedProduct-${product.id}`) ? (
            <button
              className="card__button-cart"
              type="button"
              onClick={(e) => handleAddToCartFn(e, product)}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="card__button-cart card__button-cart--selected"
              type="button"
              onClick={(e) => handleAddToCartFn(e, product)}
            >
              Added to cart
            </button>
          )}
          <button
            aria-label="like"
            className={cn('card__button-like', {
              'card__button-like--white': !localStorage.getItem(`likedProduct-${product.id}`),
              'card__button-like--red': !!localStorage.getItem(`likedProduct-${product.id}`),
            })}
            type="button"
            onClick={e => handleLikeFn(e, product)}
          />
        </div>
      </div>
    </Link>
  );
};
