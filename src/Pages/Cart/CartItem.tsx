import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Tablet, Accessories } from '../../../src/Types/BaseItem';
import { useCartContext } from '../../../src/CartContext/CartContext';
import './CartItem.scss';

interface CartItemProps {
  item: Phone | Tablet | Accessories;
  quantity: number;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  quantity,
  onRemove,
}) => {
  const { updateQuantity } = useCartContext();
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    const newQuantity =
      type === 'increase' ? itemQuantity + 1 : Math.max(1, itemQuantity - 1);

    setItemQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const itemLink =
    'priceDiscount' in item
      ? `/phones/${item.id}`
      : 'price' in item
        ? `/tablets/${item.id}`
        : `/accessories/${item}`;

  return (
    <div className="cart-item">
      <img src={item.images[0]} alt={item.name} className="cart-item__image" />
      <div className="cart-item__info">
        <h3 className="cart-item__name">
          <Link to={itemLink}>{item.name}</Link>{' '}
          {/* Відображення імені товару */}
        </h3>
        <p className="cart-item__price">
          ${'priceDiscount' in item ? item.priceDiscount : item.price}
        </p>
      </div>
      <div className="cart-item__quantity">
        <button
          className="button_minus"
          onClick={() => handleQuantityChange('decrease')}
        >
          -
        </button>
        <span>{itemQuantity}</span>
        <button
          className="button_plus"
          onClick={() => handleQuantityChange('increase')}
        >
          +
        </button>
      </div>
      <p className="cart-item__total">
        $
        {'priceDiscount' in item
          ? item.priceDiscount
          : item.price * itemQuantity}
      </p>
      <button
        onClick={onRemove} // Використовуємо onRemove переданий через пропси
        className="cart-item__remove"
      >
        ×
      </button>
    </div>
  );
};
