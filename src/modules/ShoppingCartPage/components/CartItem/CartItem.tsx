import './CartItem.scss';
import classNames from 'classnames';
import { FC, memo, useContext, useMemo, useCallback } from 'react';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/icons.config';
import { Link } from 'react-router-dom';
import { CartItemProps } from '../../types/types';

export const CartItem: FC<CartItemProps> = memo(({ cartProduct }) => {
  const { id, product, quantity } = cartProduct;
  const { name, price, image, category } = product;
  const { updateQuantity, theme } = useContext(GlobalContext);

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  const isMinQuantity = quantity === 1;

  const handleRemoveItem = useCallback(() => {
    updateQuantity(id, 0);
  }, [id, updateQuantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  }, [id, quantity, updateQuantity]);

  const handleIncreaseQuantity = useCallback(() => {
    updateQuantity(id, quantity + 1);
  }, [id, quantity, updateQuantity]);

  const decreaseButtonClass = classNames('cartItem__button', {
    'cartItem__button--disabled': isMinQuantity,
  });

  const minusIcon = isMinQuantity
    ? icons.minus__disabled[theme]
    : icons.minus[theme];

  return (
    <div className="cartItem">
      <div className="cartItem__wrapperTop">
        <button
          className="cartItem__icon-close"
          onClick={handleRemoveItem}
          aria-label="Remove item from cart"
        >
          <Icon icon={icons.close__disabled[theme]} />
        </button>

        <Link to={`/${category}/${id}`} className="cartItem__link">
          <img
            src={image}
            alt={`${name} product image`}
            className="cartItem__image"
          />
          <div className="cartItem__title">{name}</div>
        </Link>
      </div>

      <div className="cartItem__wrapperBottom">
        <div className="cartItem__counter-container">
          <button
            className={decreaseButtonClass}
            onClick={handleDecreaseQuantity}
            disabled={isMinQuantity}
            aria-label="Decrease quantity"
          >
            <Icon icon={minusIcon} />
          </button>

          <div
            className="cartItem__counter"
            aria-label={`Quantity: ${quantity}`}
          >
            {quantity}
          </div>

          <button
            className="cartItem__button"
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
          >
            <Icon icon={icons.plus[theme]} />
          </button>
        </div>

        <div
          className="cartItem__price"
          aria-label={`Total price: $${totalPrice}`}
        >
          ${totalPrice}
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';
