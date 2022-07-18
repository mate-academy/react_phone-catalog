import React from 'react';
import './BasketItem.scss';
import { Product, CartItem } from '../../type';

type Props = {
  product: Product
  renderFunc: () => void
};

export const BasketItem: React.FC<Props> = ({ product, renderFunc }) => {
  const cart = JSON.parse(localStorage.getItem('carts') || '');
  const remove = (productId: string) => {
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    localStorage.setItem('carts', JSON.stringify([
      ...carts.filter((p: CartItem) => p.id !== productId),
    ]));

    renderFunc();
  };

  const changeCount = (productId: string, action: string) => {
    const item = cart.find((p: CartItem) => p.id === productId);
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    switch (action) {
      case 'increase':
        localStorage.setItem('carts', JSON.stringify([
          ...carts.filter((p: CartItem) => p.id !== productId),
          {
            ...item,
            count: item.count + 1,
          },
        ]));
        break;
      case 'decrease':
        localStorage.setItem('carts', JSON.stringify([
          ...carts.filter((p: CartItem) => p.id !== productId),
          {
            ...item,
            count: item.count - 1 || 1,
          },
        ]));
        break;
      default:
        break;
    }

    renderFunc();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Mute volume"
        className="basket__delete"
        onClick={() => remove(product.id)}
      />
      <img
        src={product.imageUrl}
        className="basket__image"
        alt="PhotoBaske
        "
      />
      <div className="basket__name bodytext">{product.name}</div>
      <div className="basket__counter">
        <button
          type="button"
          aria-label="Mute volume"
          className="basket__minuse"
          disabled={
            cart.find((p: CartItem) => p.id === product.id)?.count === 1
          }
          onClick={() => changeCount(product.id, 'decrease')}
        >
          &#8722;
        </button>
        <p className="basket__number bodytext">
          {cart.find((p: CartItem) => p.id === product.id)?.count}
        </p>
        <button
          type="button"
          className="basket__pluse"
          onClick={() => changeCount(product.id, 'increase')}
        >
          &#43;
        </button>
      </div>
      <div className="basket__price h2">
        $
        {product.newPrice}
      </div>
    </>
  );
};
