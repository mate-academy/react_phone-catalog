import type React from 'react';
import './CartItemCard.scss';
import { NavLink } from 'react-router-dom';
import type { localProduct } from '../../hooks/useLocalStorage';
import { useThemeState } from '../../stateManagers/themeState';
import { ButtonArrow } from '../../ui/ButtonArrow/ButtonArrow';

import cn from 'classnames';

interface CartItemCardProps {
  product: localProduct;
  onDelete: () => void;
  addCount: () => void;
  subCount: () => void;
  hideCountControls?: boolean;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  product,
  onDelete,
  addCount,
  subCount,
  hideCountControls = false,
}) => {
  const { theme } = useThemeState();
  const isDisabled = product.quantity === 1;

  const totalPriceForOneProduct = product.price * product.quantity;

  return (
    <article
      className={cn('cart-item-card', `cart-item-card--${theme}`, {
        'cart-item-card--search': hideCountControls,
      })}
    >
      <div className="cart-item-card__content">
        <button
          className={`cart-item-card__icon-delete cart-item-card__icon-delete--${theme}`}
          onClick={onDelete}
        ></button>
        <NavLink to={`/${product.category}/${product.itemId}`}>
          <img
            src={product.image}
            alt={product.name}
            className="cart-item-card__image"
          />
        </NavLink>

        <NavLink to={`/${product.category}/${product.itemId}`}>
          <p className="cart-item-card__title">{product.name}</p>
        </NavLink>
      </div>

      <div className="cart-item-card__second-part">
        {!hideCountControls && (
          <div className="cart-item-card__count">
            <ButtonArrow
              icon="minus"
              onClick={subCount}
              disabled={isDisabled}
            />
            <p className="cart-item-card__number">{product.quantity}</p>
            <ButtonArrow
              icon="plus"
              onClick={addCount}
            />
          </div>
        )}
        <h3
          className={cn('cart-item-card__price', {
            'cart-item-card__price--search': hideCountControls,
          })}
        >
          ${totalPriceForOneProduct}
        </h3>
      </div>
    </article>
  );
};
