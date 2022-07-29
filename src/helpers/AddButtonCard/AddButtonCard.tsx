import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Product, CartItem } from '../../type';
import './AddButtonCard.scss';

type Props = {
  cart: boolean,
  product: Product
};

export const AddButtonCard: React.FC<Props> = ({ cart, product }) => {
  const [addCart, setAddCart] = useState('Add to cart');
  let cartsMain = [];
  if (localStorage.getItem('carts')) {
    cartsMain = JSON.parse(localStorage.getItem('carts') || '');
  }
  const searchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  useEffect(() => {}, [addCart]);

  const addToCart = () => {
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    if (!carts.find((p: CartItem) => p.id === product.id)) {
      localStorage.setItem('carts', JSON.stringify([
        ...carts,
        {
          id: product.id,
          count: 1,
          price: product.newPrice,
        },
      ]));
    } else {
      localStorage.setItem('carts', JSON.stringify([
        ...carts.filter((p: CartItem) => p.id !== product.id),
      ]));
    }

    setAddCart(prev => {
      if (prev === 'Add to cart') {
        return 'Added to cart';
      }

      return 'Add to cart';
    });
  };

  return (
    <button
      type="button"
      className={classNames('addButton', {
        'addButton--focus': cartsMain
          .some((p: CartItem) => p.id === product.id)
            || addCart === 'Added to cart',
        'addButton--cart': !cart,
        'addButton--card': cart,
      })}
      onClick={() => {
        setAddCart(prev => {
          if (prev === 'Add to cart') {
            return 'Added to cart';
          }

          return 'Add to cart';
        });
        addToCart();
        searchParams.set('basket', product.id);
        navigate({
          search: searchParams.toString(),
        });
      }}
    >
      {cartsMain.some((p: CartItem) => p.id === product.id)
        ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
