/* eslint-disable max-len */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface Props<T> {
  product: Product;
  isSlider: boolean,
  products: Product[],
  save: (value: T) => void,
  favorites: Product[],
  saveFav: (value: T) => void,
}

export const ProductCard: React.FC<Props<Product[]>> = (
  {
    product, isSlider, products, save, favorites, saveFav,
  },
) => {
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  let isFavourite = false;

  useEffect(() => {
    if (products.length) {
      for (let i = 0; i < products.length; i += 1) {
        if (products[i].id === product.id) {
          setIsDuplicate(true);
        }
      }
    }
  }, []);

  if (product) {
    isFavourite = favorites.some((item: Product) => item.id === product.id);
  }

  return (
    <Link
      to={`../${product.id}`}
      className={classNames(
        'slider__card', { 'slider__card--slider': isSlider },
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
        <p className="small-text slider__features--1">Screen</p>
        <p className="small-text">{product.screen}</p>
      </div>

      <div className="slider__features">
        <p className="small-text slider__features--1">Capacity</p>
        <p className="small-text">{product.capacity}</p>
      </div>

      <div className="slider__features">
        <p className="small-text slider__features--1">RAM</p>
        <p className="small-text">{product.ram}</p>
      </div>

      <div className="slider__button-wrapper">
        <button
          type="button"
          className={classNames(
            'button-text',
            { slider__button: !isDuplicate },
            { 'slider__button--active': isDuplicate },
          )}
          onClick={(e) => {
            e.preventDefault();

            for (let i = 0; i < products.length; i += 1) {
              if (products[i].id === product.id) {
                setHasErrorMessage(true);

                setTimeout(() => {
                  setHasErrorMessage(false);
                }, 3000);

                return;
              }
            }

            if (!hasErrorMessage) {
              save([...products, product]);
            }
          }}
        >
          {isDuplicate
            ? 'Added to cart'
            : 'Add to cart'}
        </button>

        <button
          type="button"
          className="slider__button--like"
          onClick={(e) => {
            e.preventDefault();

            if (isFavourite) {
              const newFavorites = favorites.filter((item: Product) => item.id !== product.id);

              saveFav([...newFavorites]);
            } else {
              saveFav([...favorites, product]);
            }
          }}
        >
          {isFavourite
            ? (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.62848 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.794 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49498 13.6483C8.22161 13.9217 7.77839 13.9217 7.50503 13.6483L1.61169 7.75496C0.792623 6.93589 0.332474 5.82499 0.332474 4.66665C0.332474 3.50831 0.792623 2.39741 1.61169 1.57834C2.43076 0.759273 3.54166 0.299124 4.7 0.299124C5.85834 0.299124 6.96924 0.759273 7.78831 1.57834L8 1.79003L8.21158 1.57846C8.21162 1.57842 8.21154 1.5785 8.21158 1.57846C8.61706 1.17281 9.0986 0.850909 9.62848 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80436 2.0739 9.47726 2.29255 9.20176 2.56818L8.49498 3.27496C8.22161 3.54833 7.77839 3.54833 7.50503 3.27496L6.79836 2.56829C6.24184 2.01177 5.48704 1.69912 4.7 1.69912C3.91296 1.69912 3.15816 2.01177 2.60164 2.56829C2.04512 3.12481 1.73247 3.87961 1.73247 4.66665C1.73247 5.45369 2.04512 6.20849 2.60164 6.76501L8 12.1634L13.3984 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#EB5757" />
              </svg>
            )
            : (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.62848 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.794 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49498 13.6483C8.22161 13.9217 7.77839 13.9217 7.50503 13.6483L1.61169 7.75496C0.792623 6.93589 0.332474 5.82499 0.332474 4.66665C0.332474 3.50831 0.792623 2.39741 1.61169 1.57834C2.43076 0.759273 3.54166 0.299124 4.7 0.299124C5.85834 0.299124 6.96924 0.759273 7.78831 1.57834L8 1.79003L8.21158 1.57846C8.21162 1.57842 8.21154 1.5785 8.21158 1.57846C8.61706 1.17281 9.0986 0.850909 9.62848 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80436 2.0739 9.47726 2.29255 9.20176 2.56818L8.49498 3.27496C8.22161 3.54833 7.77839 3.54833 7.50503 3.27496L6.79836 2.56829C6.24184 2.01177 5.48704 1.69912 4.7 1.69912C3.91296 1.69912 3.15816 2.01177 2.60164 2.56829C2.04512 3.12481 1.73247 3.87961 1.73247 4.66665C1.73247 5.45369 2.04512 6.20849 2.60164 6.76501L8 12.1634L13.3984 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#b4bdc3" />
              </svg>
            )}

        </button>
      </div>

      {hasErrorMessage
        && <p className="small-text">Product already in the cart</p>}

    </Link>
  );
};
