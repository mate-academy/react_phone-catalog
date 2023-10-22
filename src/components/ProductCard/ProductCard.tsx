import {
  FC,
  useContext,
  useEffect,
  useState,
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
    handleAddFn,
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

  const [hasBeenAdded, setHasBeenAdded]
  = useState(false);
  const [hasBeenLiked, setHasBeenLiked]
  = useState(false);

  useEffect(() => {
    setHasBeenLiked(localStorage.getItem('liked') === id.toString());
  }, [localStorage.getItem('liked')]);

  useEffect(() => {
    return setHasBeenAdded(localStorage.getItem('added') === id.toString());
  }, [localStorage.getItem('added')]);

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
          {!hasBeenAdded ? (
            <button
              className="card__button-cart"
              type="button"
              onClick={(e) => handleAddFn(e, product)}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="card__button-cart card__button-cart--selected"
              type="button"
              onClick={(e) => handleAddFn(e, product)}
            >
              Selected
            </button>
          )}
          <button
            aria-label="like"
            className={cn('card__button-like', {
              'card__button-like--white': !hasBeenLiked,
              'card__button-like--red': hasBeenLiked,
            })}
            type="button"
            onClick={(e) => handleLikeFn(e, product)}
          />
        </div>
      </div>
    </Link>
  );
};
