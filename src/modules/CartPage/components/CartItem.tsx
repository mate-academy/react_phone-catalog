import React, { useRef, useEffect } from 'react';
import { CartItemType } from '../../../contexts';
import { Button } from '../../shared';
import { Icon } from '../../shared/components/Icon/Icon';

import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
  isEditing: boolean;
  editValue: string;
  onRemove: (itemId: string) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onDoubleClick: (itemId: string) => void;
  onInputChange: (value: string) => void;
  onInputBlur: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item: { product, quantity },
  isEditing,
  editValue,
  onRemove,
  onIncrement,
  onDecrement,
  onDoubleClick,
  onInputChange,
  onInputBlur,
  onKeyPress,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <li className={styles['cart-item']}>
      <div className={styles['cart-item__product']}>
        <Button
          variant="icon"
          noBorder
          onClick={() => onRemove(product.itemId)}
        >
          <Icon name="close" />
        </Button>
        <img
          src={product.image}
          alt={product.name}
          className={styles['cart-item__image']}
        />
        <h4
          className={styles['cart-item__title']}
        >{`${product.name} (${product.price})`}</h4>
      </div>
      <div className={styles['cart-item__details']}>
        <div className={styles['cart-item__qty-controls']}>
          <Button
            variant="icon"
            size="sm"
            disabled={quantity === 1}
            onClick={() => onDecrement(product.itemId)}
          >
            <Icon name="minus" />
          </Button>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={e => onInputChange(e.target.value)}
              onBlur={onInputBlur}
              onKeyDown={onKeyPress}
              className={styles['cart-item__count-input']}
              min="1"
              max="999"
            />
          ) : (
            <span
              className={styles['cart-item__count']}
              onDoubleClick={() => onDoubleClick(product.itemId)}
              title="Double-click to edit"
            >
              {quantity}
            </span>
          )}
          <Button
            variant="icon"
            size="sm"
            onClick={() => onIncrement(product.itemId)}
          >
            <Icon name="plus" />
          </Button>
        </div>
        <span className={styles['cart-item__price']}>
          {quantity * product.price}$
        </span>
      </div>
    </li>
  );
};
