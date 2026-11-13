import { Product, LocalProduct } from '../interface/Product';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

interface CartItemProps {
  item: Product;
  quantity: number;
  title: string;
  changeQuantity: (id: string, numb: number) => void;
}

const CartItem = ({ item, quantity, title, changeQuantity }: CartItemProps) => {
  const navigate = useNavigate();

  function showPrice() {
    const cart: LocalProduct[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    const it = cart.find(i => {
      return i?.id === item.itemId;
    });

    return item.price * (it?.quantity ?? 0);
  }

  return (
    <div className="cart__item" key={item.name}>
      <button
        className="cart__close"
        onClick={() => {
          const cart: LocalProduct[] = JSON.parse(
            localStorage.getItem('cart') || '[]',
          );
          const updatedCart = cart.filter(c => c.id !== item.itemId); // mesmo campo de cima

          localStorage.setItem('cart', JSON.stringify(updatedCart));
          window.location.reload();
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/close.svg`}
          alt="Close"
        />
      </button>
      <button
        className="cart__button"
        onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
      >
        <img src={item.image} alt={title} className="cart__image" />
      </button>
      <button
        className="cart__button"
        onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
      >
        <span className="cart__title">{title}</span>
      </button>
      <div className="cart__quantity">
        <button
          className="cart__quantity-btn"
          onClick={() => {
            // quantity -= 1;

            /*
            const cart: LocalProduct[] = JSON.parse(
              localStorage.getItem('cart') || '[]',
            );

            const it = cart.find(i => {
              return i?.id === item.itemId;
            });

            if (it) {
              if ((it.quantity ?? 1) > 1) {
                it.quantity = (it.quantity ?? 1) - 1;
              }

              localStorage.setItem('cart', JSON.stringify(cart));
            }
              */

            changeQuantity(item.itemId, -1);
          }}
        >
          -
        </button>
        <span className="cart__quantity-num">{quantity}</span>
        <button
          className="cart__quantity-btn"
          onClick={() => {
            // quantity += 1;

            /*
            const cart: LocalProduct[] = JSON.parse(
              localStorage.getItem('cart') || '[]',
            );

            const it = cart.find(i => {
              return i?.id === item.itemId;
            });

            if (it) {
              it.quantity = (it.quantity ?? 1) + 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            */
            changeQuantity(item.itemId, 1);
          }}
        >
          +
        </button>
      </div>
      <span className="cart__price">${showPrice()}</span>
    </div>
  );
};

export default CartItem;
