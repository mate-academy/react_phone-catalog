import './CartItem.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { CartProduct } from '../../../../types/CartProduct';
import { GlobalContext } from '../../../../store/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { iconsObject } from '../../../../constants/iconsObject';

type Props = {
  cartProduct: CartProduct;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { updateQuantity, theme } = useContext(GlobalContext);

  const totalProductPrice = cartProduct.product.price * cartProduct.quantity;

  return (
    <div className="cartItem">
      <div className="cartItem__wrapperTop">
        <button
          className="cartItem__icon-close"
          onClick={() => updateQuantity(cartProduct.id, 0)}
        >
          <Icon icon={iconsObject.close__disabled} />
        </button>
        <img
          src={cartProduct.product.image}
          alt="Image product"
          className="cartItem__image"
        />
        <span className="cartItem__title">{cartProduct.product.name}</span>
      </div>

      <div className="cartItem__wrapperBottom">
        <div className="cartItem__counter-container">
          <button
            className={classNames('cartItem__button', {
              'cartItem__button--disabled': cartProduct.quantity === 1,
            })}
            onClick={() => {
              if (cartProduct.quantity > 1) {
                updateQuantity(cartProduct.id, cartProduct.quantity - 1);
              }
            }}
          >
            {cartProduct.quantity === 1 ? (
              theme === 'light' ? (
                <Icon icon={iconsObject.arrow_left__disabled} />
              ) : (
                <Icon icon={iconsObject.arrow_left_dark__disabled} />
              )
            ) : theme === 'light' ? (
              <Icon icon={iconsObject.arrow_left} />
            ) : (
              <Icon icon={iconsObject.arrow_left_dark} />
            )}
          </button>
          <span className="cartItem__counter">{cartProduct.quantity}</span>
          <button
            className="cartItem__button"
            onClick={() => {
              updateQuantity(cartProduct.id, cartProduct.quantity + 1);
            }}
          >
            {theme === 'light' ? (
              <Icon icon={iconsObject.arrow_right} />
            ) : (
              <Icon icon={iconsObject.arrow_right_dark} />
            )}
          </button>
        </div>

        <span className="cartItem__price">{`$${totalProductPrice}`}</span>
      </div>
    </div>
  );
};
