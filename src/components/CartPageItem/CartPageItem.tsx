import React, { useEffect, useRef, useState } from 'react';
import { useCartValues } from '../../store/CartContext';
import cn from 'classnames';
import { CartItem } from '../../types/ContextValues';

type Props = {
  item: CartItem;
};

export const CartPageItem: React.FC<Props> = ({ item }) => {
  const { product, quantity } = item;

  const [isOpenQuantity, setIsOpenQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState<number>(quantity);
  const inputRef = useRef<HTMLInputElement>(null);

  const { removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } =
    useCartValues();

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setNewQuantity(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newQuantity === 0) {
        removeFromCart(product);
      } else {
        updateQuantity(product.id, newQuantity);
      }

      setIsOpenQuantity(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpenQuantity(false);
      }
    };

    if (isOpenQuantity) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenQuantity]);

  return (
    <div className="cartPageItem">
      <div className="cartPageItem__top">
        <div
          className="cartPageItem__top--delete"
          onClick={() => removeFromCart(product)}
        ></div>
        <img
          className="cartPageItem__top--image"
          src={product.image}
          alt="card image"
        />
        <p className="cartPageItem__top--title">{product.name}</p>
      </div>
      <div className="cartPageItem__bottom">
        <div className="cartPageItem__bottom--changeQuantity">
          <div
            aria-disabled={quantity === 1}
            className={cn('card__decreaseQuantity', {
              'card__decreaseQuantity--active': quantity > 1,
              'card__decreaseQuantity--disabled': quantity === 1,
            })}
            onClick={() => decreaseQuantity(product)}
          ></div>

          {isOpenQuantity ? (
            <div className="card__changeCurrentQuantity">
              <input
                ref={inputRef}
                className="card__changeCurrentQuantity--input"
                type="number"
                value={newQuantity}
                onChange={handleChangeQuantity}
                onKeyDown={handleKeyDown}
                placeholder={`${quantity}`}
                autoFocus
              />
            </div>
          ) : (
            <div
              className="card__currentQuantity"
              onClick={() => setIsOpenQuantity(true)}
            >
              {quantity}
            </div>
          )}

          <div
            className="card__increaseQuantity"
            onClick={() => increaseQuantity(product)}
          ></div>
        </div>
        <h3 className="cartPageItem__price">${product.price}</h3>
      </div>
    </div>
  );
};
