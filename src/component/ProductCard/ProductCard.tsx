import React, { useContext } from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../Type/Product';
import { ProductContext } from '../../ProductContext';

interface Props {
  product: Product,
  sale?: boolean,
}

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({ product, sale }) => {
  const {
    id,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    itemId,
  } = product;

  const {
    cartItems,
    favourites,
    hasItems,
    addCart,
    addFavourites,
  } = useContext(ProductContext);

  const [searchParams] = useSearchParams();

  return (
    <div className="card" data-cy="cardsContainer">
      <Link
        to={{
          pathname: `../phones/${itemId}`,
          search: searchParams.toString(),
        }}
      >
        <img
          className="card__img"
          src={`${BASE_URL}${image}`}
          alt="phones"
        />

        <h3 className="card__title">
          {name}
        </h3>

        <div className="card__price">
          <p className="card__price-new">
            {`$${fullPrice}`}
          </p>

          <p className="card__price-old">
            {sale && (
              `$${price}`
            )}
          </p>
        </div>

        <div className="card__characteristic">
          <p className="card__characteristic-type">
            Screen
          </p>

          <p className="card__characteristic-value">
            {screen}
          </p>
        </div>

        <div className="card__characteristic">
          <p className="card__characteristic-type">
            Capacity
          </p>

          <p className="card__characteristic-value">
            {capacity}
          </p>
        </div>

        <div className="card__characteristic card__characteristic-last">
          <p className="card__characteristic-type">
            RAM
          </p>

          <p className="card__characteristic-value">
            {ram}
          </p>
        </div>
      </Link>

      <div className="card__buttons">
        <button
          type="button"
          className={cn(
            'card__buttons-add',
            { selected: hasItems(+id, cartItems) },
          )}
          onClick={() => addCart(+id, product)}
        >
          {hasItems(+id, cartItems)
            ? ('Selected')
            : ('Add to cart')}
        </button>

        <button
          type="button"
          className="card__buttons-like"
          onClick={() => addFavourites(+id, product)}
        >
          {hasItems(+id, favourites)
            ? (
              <img
                src="./icon/Favourites.svg"
                alt="Favourites"
              />
            )
            : (
              <img
                src="./icon/Like.svg"
                alt="like"
              />
            )}
        </button>
      </div>
    </div>
  );
};
