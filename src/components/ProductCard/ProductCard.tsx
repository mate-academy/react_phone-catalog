import React, { useContext, memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { GlobalContext } from '../../store/GlobalContext';
import { Product } from '../../type/Product';
import { ICONS } from '../../icons';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const [searchParams] = useSearchParams();

  const {
    phoneId,
    discount,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    isAddCard,
    inFavourite,
  } = product;

  const {
    handleAddCard,
  } = useContext(GlobalContext);

  return (
    <div
      className="card"
      data-qa="card"
    >
      <Link
        to={`/phones/${phoneId}`}
        state={{ search: searchParams.toString() }}
      >
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt={name}
          className="card__img"
        />
      </Link>

      <div className="card__info">
        <Link
          to={`/phones/${phoneId}`}
          state={{ search: searchParams.toString() }}
        >
          <p className="card__title">
            {name}
          </p>

          <div className="card__price">
            <p className="card__price-new">
              {`$${price}`}
            </p>
            {discount && (
              <p className="card__price-old">
                <s>{`$${fullPrice}`}</s>
              </p>
            )}
          </div>

          <div className="card__line" />

          <div className="card__specs">
            <div className="card__specs-box">
              <p className="card__specs-title">Screen</p>
              <p className="card__specs-details">
                {screen}
              </p>
            </div>
            <div className="card__specs-box">
              <p className="card__specs-title">Capacity</p>
              <p className="card__specs-details">
                {capacity}
              </p>
            </div>
            <div className="card__specs-box">
              <p className="card__specs-title">RAM</p>
              <p className="card__specs-details">
                {ram}
              </p>
            </div>
          </div>
        </Link>

        <div className="card__btns">
          <div className="card__btns-container">
            <button
              type="button"
              className={cn('button button--card-add', {
                'button--selected': isAddCard,
              })}
              onClick={() => handleAddCard(product, 'addCard')}
            >
              <p className="button__text">
                {isAddCard ? 'You`ve added' : 'Added to cart'}
              </p>
            </button>

            <button
              type="button"
              className="button button--favourites button--hover"
              onClick={() => handleAddCard(product, 'favourites')}
            >
              <img
                alt="favourites"
                src={inFavourite ? ICONS.favourites_like : ICONS.favourites}
                className="icon icon--hover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
