import React from 'react';
import './BasketItem.scss';
import { CartItem } from '../../type';

type Props = {
  product: CartItem,
  renderFunc: () => void
};

export const BasketItem: React.FC<Props> = ({ product, renderFunc }) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('carts') || '');
  const remove = (productId: string) => {
    localStorage.setItem('carts', JSON.stringify([
      ...cart.filter((p: CartItem) => p.id !== productId),
    ]));

    renderFunc();
  };

  const changeCount = (productId: string, action: string) => {
    localStorage.setItem('carts', JSON.stringify(
      cart.map((item: CartItem) => (
        item.id === productId
          ? ({
            ...item,
            count: (action === 'increase'
              ? item.count + 1
              : item.count - 1 || 1),
          })
          : item
      )),
    ));

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
        src={product.image}
        className="basket__image"
        alt="PhotoBasket"
      />
      <div className="basket__name bodytext">{product.title}</div>
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
        {product.price}
      </div>
    </>
  );
};
