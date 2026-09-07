import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../../../hooks';
import { ProductWithQuantity } from '../../../../types';

import { CloseIcon, MinusIcon, PlusIcon } from '../../../../components';

import styles from './CartItem.module.scss';

type Props = {
  product: ProductWithQuantity;
};

export const CartItem: React.FC<Props> = ({
  product: { itemId, category, image, name, price, quantity },
}) => {
  const { removeCartItem, updateCartItemQuantity } = useCart();
  const [inputValue, setInputValue] = useState<string>(quantity.toString());

  const isDecrementButtonDisabled = quantity <= 1;
  const isIncrementButtonDisabled = quantity >= 999;

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.replace(/[^0-9]/g, '');

    setInputValue(normalizedValue);
  };

  const handleInputBlur = () => {
    const newQuantity = Math.min(Math.max(parseInt(inputValue) || 1, 1), 999);

    if (newQuantity !== quantity) {
      updateCartItemQuantity(itemId, newQuantity);
    }

    setInputValue(newQuantity.toString());
  };

  return (
    <article className={styles['cart-item']}>
      <div className={styles['cart-item__top']}>
        <button
          className={styles['cart-item__remove-btn']}
          onClick={() => removeCartItem(itemId)}
        >
          <CloseIcon />
        </button>

        <Link
          to={`/${category}/${itemId}`}
          className={styles['cart-item__link']}
        >
          <img src={image} alt={name} className={styles['cart-item__img']} />
        </Link>

        <Link
          to={`/${category}/${itemId}`}
          className={styles['cart-item__name']}
        >
          {name}
        </Link>
      </div>

      <div className={styles['cart-item__bottom']}>
        <div className={styles['quantity-selector']}>
          <button
            className={styles['quantity-selector__button']}
            disabled={isDecrementButtonDisabled}
            onClick={() => updateCartItemQuantity(itemId, quantity - 1)}
          >
            <MinusIcon className={styles['quantity-selector__icon']} />
          </button>

          <input
            className={styles['quantity-selector__input']}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleInputBlur();
              }
            }}
          />

          <button
            className={styles['quantity-selector__button']}
            disabled={isIncrementButtonDisabled}
            onClick={() => updateCartItemQuantity(itemId, quantity + 1)}
          >
            <PlusIcon className={styles['quantity-selector__icon']} />
          </button>
        </div>

        <strong className={styles['cart-item__price']}>{`$${price}`}</strong>
      </div>
    </article>
  );
};
