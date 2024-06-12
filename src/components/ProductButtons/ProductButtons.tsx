import React, { useEffect, useState } from 'react';
import './ProductButtons.scss';
import classNames from 'classnames';
import { CartObjType } from '../../helpers/types/CartObjType';

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  isBig?: boolean;
};

export const ProductButtons: React.FC<Props> = ({
  id,
  name,
  price,
  image,
  isBig = false,
}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const checkIsInFavorites = () => {
    const storage = localStorage.getItem('favorites');

    if (storage) {
      const list = JSON.parse(storage);

      if (list.includes(id)) {
        return true;
      }
    }

    return false;
  };

  const checkIsInCart = () => {
    const storage = localStorage.getItem('cart');

    if (storage) {
      try {
        const cart: CartObjType = JSON.parse(storage);

        if (cart[id]) {
          return true;
        }
      } catch (error) {
        localStorage.removeItem('cart');

        return false;
      }
    }

    return false;
  };

  useEffect(() => {
    setIsInFavorites(checkIsInFavorites());
    setIsInCart(checkIsInCart());
  }, []);

  const addFirstToCart = () => {
    const firstInCart: CartObjType = {
      [id]: {
        id,
        name,
        quantity: 1,
        image,
        price,
      },
    };

    localStorage.setItem('cart', JSON.stringify(firstInCart));
  };

  const handleClickToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const key = 'cart';

    const storage = localStorage.getItem(key);

    if (storage) {
      try {
        const cart = JSON.parse(storage);

        if (cart[id]) {
          delete cart[id];

          if (Object.keys(cart).length === 0) {
            localStorage.removeItem(key);
          } else {
            localStorage.setItem(key, JSON.stringify(cart));
          }

          setIsInCart(false);
        } else {
          cart[id] = {
            id,
            name,
            quantity: 1,
            image,
            price,
          };

          localStorage.setItem(key, JSON.stringify(cart));
          setIsInCart(true);
        }
      } catch (error) {
        localStorage.removeItem(key);

        addFirstToCart();
        setIsInCart(true);
      }
    } else {
      addFirstToCart();
      setIsInCart(true);
    }

    window.dispatchEvent(new Event('storage'));
  };

  const handleClickToFavoriteList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const key = 'favorites';

    const storageFavorites = localStorage.getItem(key);

    if (storageFavorites) {
      const favorites = new Set(JSON.parse(storageFavorites));

      if (favorites.has(id)) {
        favorites.delete(id);
        setIsInFavorites(false);
      } else {
        favorites.add(id);
        setIsInFavorites(true);
      }

      if (favorites.size === 0) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(Array.from(favorites)));
      }
    } else {
      localStorage.setItem(key, JSON.stringify([id]));
      setIsInFavorites(true);
    }

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div
      className={classNames('product-buttons', {
        'product-buttons--big': isBig,
      })}
    >
      <button
        className={classNames('product-buttons__cart', {
          'product-buttons__cart--selected': isInCart,
        })}
        type="button"
        onClick={handleClickToCart}
      >
        {!isInCart ? 'Add to cart' : 'Added to cart'}
      </button>

      {/* eslint-disable-next-line */}
      <button
        className={classNames('product-buttons__favorite', {
          'product-buttons__favorite--selected': isInFavorites,
        })}
        type="button"
        data-cy="addToFavorite"
        onClick={handleClickToFavoriteList}
      />
    </div>
  );
};
