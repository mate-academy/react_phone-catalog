/* eslint-disable import/no-cycle */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { ShopContext } from '../../App';
import { Product } from '../../types/Product';
import './ControlBlock.scss';

type Props = {
  isLarge: boolean;
  product: Product;
};

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

export const ControlBlock: React.FC<Props> = ({
  isLarge,
  product,
}) => {
  const isFavourite: boolean
    = JSON.parse(localStorage.getItem('favouritesItems') || '')
      .some((item: CartItem) => item.id === product.id);

  const isAddedToCart: boolean
    = JSON.parse(localStorage.getItem('cartItems') || '')
      .some((item: CartItem) => item.id === product.id);

  const {
    quantity,
    setQuantity,
    favoriteCount,
    setFavouriteCount,
  } = useContext(ShopContext);

  const changeCartStore = () => {
    const cartItems: CartItem[]
      = JSON.parse(localStorage.getItem('cartItems') || '');

    if (cartItems.some(item => item.id === product.id)) {
      localStorage.setItem('cartItems', JSON.stringify(
        cartItems.filter(item => item.id !== product.id),
      ));

      const currentItem = cartItems.find(item => (
        item.id === product.id));

      if (currentItem) {
        setQuantity(quantity - currentItem.quantity);
      }
    } else {
      localStorage.setItem('cartItems', JSON.stringify([
        ...cartItems,
        {
          id: product.id,
          quantity: 1,
          product,
        },
      ]));

      setQuantity(quantity + 1);
    }
  };

  const changeFavouriteStore = () => {
    const favouritesItems: Product[]
        = JSON.parse(localStorage.getItem('favouritesItems') || '');

    if (favouritesItems.some(item => item.id === product.id)) {
      localStorage.setItem('favouritesItems', JSON.stringify(
        favouritesItems.filter(item => item.id !== product.id),
      ));

      setFavouriteCount(favoriteCount - 1);
    } else {
      localStorage.setItem('favouritesItems', JSON.stringify([
        ...favouritesItems,
        {
          ...product,
        },
      ]));

      setFavouriteCount(favoriteCount + 1);
    }
  };

  return (
    <div className="control-block">
      <button
        type="button"
        className={classNames(
          'button',
          'control-block__button',
          {
            'button--is-active': isAddedToCart,
            'button--is-large': isLarge,
          },
        )}
        onClick={changeCartStore}
      >
        Add to cart
      </button>
      <button
        type="button"
        className="
          control-block__button
          control-block__button--is-transparent"
        onClick={changeFavouriteStore}
      >
        <div className={classNames(
          'icon-box',
          'icon-box--is-big',
          { 'icon-box--is-large': isLarge },
        )}
        >
          <span className={classNames(
            'icon',
            'icon--heart',
            { 'icon--heart-selected': isFavourite },
          )}
          />
        </div>
      </button>
    </div>
  );
};
