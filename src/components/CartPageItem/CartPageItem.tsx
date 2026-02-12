import React, { useEffect, useRef, useState } from 'react';
import { CartItem } from '../../types/ContextValues';
import { useCartValues } from '../../store/CartStore';
import { Product } from '../../types/Product';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import classNames from 'classnames';
import './CartPageItem.module.scss';

type DetailedProduct = Phone | Tablet | Accessory;
type AnyProduct = Product | DetailedProduct;

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
        updateQuantity(product.itemId, newQuantity);
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

  const getProductImage = (productItem: AnyProduct): string => {
    if (productItem.image) {
      return productItem.image;
    }

    const detailedProduct = productItem as DetailedProduct;

    if (detailedProduct.images && detailedProduct.images[0]) {
      return detailedProduct.images[0];
    }

    return '/img/notFoundPage.png';
  };

  const getProductPrice = (productItem: AnyProduct): number => {
    const detailedProduct = productItem as DetailedProduct;

    return Number(
      detailedProduct.priceDiscount ??
        productItem.price ??
        detailedProduct.priceRegular ??
        0,
    );
  };

  return (
    <div className="cartPageItem">
      <div className="cartPageItem__top">
        <button
          className="cartPageItem__top--delete"
          onClick={() => removeFromCart(product)}
          aria-label="Remove from cart"
          type="button"
        />
        <img
          src={getProductImage(product)}
          alt="card image"
          className="cartPageItem__top--image"
        />
        <p className="cartPageItem__top--title">{product.name}</p>
      </div>
      <div className="cartPageItem__bottom">
        <div className="cartPageItem__bottom--changeQuantity">
          <button
            aria-disabled={quantity === 1}
            className={classNames('card__decreaseQuantity', {
              'card__decreaseQuantity--active': quantity > 1,
              'card__decreaseQuantity--disabled': quantity === 1,
            })}
            onClick={() => decreaseQuantity(product)}
            aria-label="Decrease quantity"
            type="button"
          />

          {isOpenQuantity ? (
            <div className="card__changeCurrentQuantity">
              <input
                type="number"
                ref={inputRef}
                className="card__changeCurrentQuantity--input"
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

          <button
            className="card__increaseQuantity"
            onClick={() => increaseQuantity(product)}
            aria-label="Increase quantity"
            type="button"
          />
        </div>
        {(() => {
          const price = getProductPrice(product);

          return <h3 className="cartPageItem__price">${price * quantity}</h3>;
        })()}
      </div>
    </div>
  );
};
