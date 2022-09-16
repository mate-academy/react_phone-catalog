import React, { useState } from 'react';

import './CartItem.scss';

type Props = {
  product: Product,
  deleteCart: (id: string) => void,
  updateAllCost: () => void,
};

export const CartItem: React.FC<Props> = ({
  product, deleteCart, updateAllCost,
}) => {
  const [quantity, setQuantity] = useState<number>(
    product.quantity ? product.quantity : 0,
  );

  const changesQuantity = (action: string) => {
    const getStorageCard = localStorage.getItem('cart');

    if (getStorageCard) {
      const parseStorageCard = JSON.parse(getStorageCard);

      let count = quantity;

      switch (action) {
        case 'add':
          count += 1;
          setQuantity((prev: number) => prev + 1);
          break;
        case 'remove':
          if (count > 1) {
            count -= 1;
          }

          setQuantity((prev: number) => (prev !== 1 ? prev - 1 : prev));
          break;
        default:
          break;
      }

      const selectProduct = parseStorageCard
        .map((prod: Product) => {
          if (prod.id === product.id) {
            return ({
              ...prod,
              quantity: count,
            });
          }

          return prod;
        });

      localStorage.setItem('cart', JSON.stringify(selectProduct));
      updateAllCost();
    }
  };

  return (
    <div className="CartItem">
      <div className="CartItem__delete">
        <button
          type="button"
          onClick={() => deleteCart(product.id)}
          className="CartItem__btn-delete"
        >
          <i className="icon-Close" />
        </button>
      </div>
      <div className="CartItem__img">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="CartItem__title">
        <span>{product.name}</span>
      </div>
      <div className="CartItem__quantity">
        <button
          type="button"
          className="CartItem__button"
          disabled={quantity === 1}
          onClick={() => {
            changesQuantity('remove');
          }}
        >
          <i className="icon-Minus" />
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          className="CartItem__button"
          onClick={() => {
            changesQuantity('add');
          }}
        >
          <i className="icon-Plus" />
        </button>
      </div>
      <div className="CartItem__price">
        <span>
          $
          {((100 - product.discount) / 100) * product.price * quantity}
        </span>
      </div>
    </div>
  );
};
