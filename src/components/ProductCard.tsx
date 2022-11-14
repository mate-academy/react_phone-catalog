/* eslint-disable max-len */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface Props<T> {
  product: Product;
  isSlider: boolean;
  products: Product[],
  save: (value: T) => void,
  favorites: Product[],
  saveFavorite: (value: T) => void,
}

export const ProductCard: React.FC<Props<Product[]>> = (
  {
    product, isSlider, products, favorites, save, saveFavorite,
  },
) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);

  useEffect(() => {
    if (products.length) {
      for (let i = 0; i < products.length; i += 1) {
        if (products[i].id === product.id) {
          setIsDuplicate(true);
        }
      }
    }
  }, []);

  let isFavorite = false;

  if (product) {
    isFavorite = favorites.some((prod: Product) => prod.id === product.id);
  }

  return (
    <Link
      to={`../${product.id}`}
      className={classNames(
        'slider__card',
        { 'slider__card--slider': isSlider },
      )}
      key={product.id}
    >
      <img
        className="slider__img--hot slider__img--hot"
        src={product.imageUrl}
        alt={product.name}
      />

      <p className="body-text slider__title">{product.name}</p>

      <h2 className="slider__price">
        {product.discount === 0
          && `$${product.price}`}

        {product.discount !== 0
            && (
              <>
                $
                {
                  product.price - (product.price * (product.discount / 100))
                }
                <span className="slider__fullprice">{`$${product.price}`}</span>
              </>
            )}
      </h2>

      <hr className="slider__line" />

      <div className="slider__features">
        <p className="small-text lider__features--1">Screen</p>
        <p className="small-text">{product.screen}</p>
      </div>

      <div className="slider__features">
        <p className="small-text lider__features--1">Capacity</p>
        <p className="small-text">{product.capacity}</p>
      </div>

      <div className="slider__features">
        <p className="small-text lider__features--1">RAM</p>
        <p className="small-text">{product.ram}</p>
      </div>

      <div className="slider__button-wrapper">
        <button
          type="button"
          className={classNames(
            'button-text',
            { slider__button: !inCart || isDuplicate },
            { 'slider__button--active': inCart || isDuplicate },
          )}
          onClick={(e) => {
            e.preventDefault();

            if (products.find(prod => prod.id === product.id)) {
              setHasErrorMessage(true);

              setTimeout(() => {
                setHasErrorMessage(false);
              }, 3000);

              return;
            }

            if (!hasErrorMessage) {
              save([...products, product]);
            }

            setInCart(true);
          }}
        >
          {inCart || isDuplicate
            ? 'Added to cart'
            : 'Add to cart'}
        </button>

        <button
          type="button"
          className="slider__button--like"
          onClick={(event) => {
            event.preventDefault();

            if (isFavorite) {
              const newFavorites = favorites.filter((fav: Product) => fav.id !== product.id);

              saveFavorite([...newFavorites]);
            } else {
              saveFavorite([...favorites, product]);
            }
          }}
        >
          {isFavorite
            ? (
              <img src="img/svg/heart-red.svg" alt="Heart" />
            )
            : (
              <img src="img/svg/heart-grey.svg" alt="Heart" />
            )}
        </button>
      </div>

      {hasErrorMessage
        && <p className="small-text">Product is already in the cart</p>}

    </Link>
  );
};
