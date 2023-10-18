import './productCard.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getCartList,
  getFavouritesList,
  isProductInStorage,
  setToLocaleStorage,
} from '../interactionLocaleStorage/interactionLocaleStorage';

import { Product } from '../../type/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [cartList, setCartList] = useState<Product[] | null>(null);
  const [favouritesList, setFavouritesList] = useState<Product[] | null>(null);

  const {
    type,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const discountPrice = price * ((100 - discount) / 100);

  useEffect(() => {
    getCartList(setCartList);
    getFavouritesList(setFavouritesList);

    window.addEventListener('storage', () => {
      getCartList(setCartList);
      getFavouritesList(setFavouritesList);
    });

    return () => window.removeEventListener('storage', () => {
      getCartList(setCartList);
      getFavouritesList(setFavouritesList);
    });
  }, []);

  return (
    <article
      data-cy="cardsContainer"
      className="product-card"
    >
      <Link to={`/${type}s/${product.id}`}>
        <div className="product-card__image-wrapper">
          <img
            className="product-card__image"
            src={imageUrl}
            alt="product"
          />
        </div>
      </Link>

      <div className="product-card__main-info">
        <Link to={`/${type}s/${product.id}`} className="product-card__name">
          {name}
        </Link>

        <div className="product-card__price-wrapper">
          <p className="product-card__price">
            {`$${discountPrice}`}
          </p>

          {discount ? (
            <p className="product-card__old-price">
              {`$${price}`}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>

      <ul className="product-card__technical-data">
        <li className="product-card__technical-data-item">
          <p className="product-card__technical-data-name">
            Screen
          </p>

          <p className="product-card__technical-data-info">
            {screen}
          </p>
        </li>

        <li className="product-card__technical-data-item">
          <p className="product-card__technical-data-name">
            Capacity
          </p>

          <p className="product-card__technical-data-info">
            {capacity || '- '}
          </p>
        </li>

        <li className="product-card__technical-data-item">
          <p className="product-card__technical-data-name">
            RAM
          </p>

          <p className="product-card__technical-data-info">
            {ram || '-'}
          </p>
        </li>
      </ul>

      <div className="product-card__buttons">
        <button
          className={classNames('product-card__button-add', {
            'product-card__button-add--selected':
            isProductInStorage(cartList, product),
          })}
          type="button"
          onClick={() => setToLocaleStorage('cart', product)}
        >
          {isProductInStorage(cartList, product) ? (
            'Added to cart'
          ) : (
            'Add to cart'
          )}
        </button>

        <button
          className={classNames('product-card__button-favourite', {
            'product-card__button-favourite--selected':
              isProductInStorage(favouritesList, product),
          })}
          type="button"
          aria-label="add to favourites"
          data-cy="addToFavorite"
          onClick={() => setToLocaleStorage('favourites', product)}
        />
      </div>
    </article>
  );
};
