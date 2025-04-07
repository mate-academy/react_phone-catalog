import './CartItem.scss';
import classNames from 'classnames';
import { FC, memo, useContext, useMemo } from 'react';
import { Cart } from '../../../../types/Cart';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/iconsObject';

type Props = {
  cartProduct: Cart;
};

export const CartItem: FC<Props> = memo(
  ({
    cartProduct: {
      id,
      product: { name, price, image },
      quantity,
    },
  }) => {
    const { updateQuantity, theme } = useContext(GlobalContext);

    const totalProductPrice = useMemo(
      () => price * quantity,
      [price, quantity],
    );

    return (
      <div className="cartItem">
        <div className="cartItem__wrapperTop">
          <button
            className="cartItem__icon-close"
            onClick={() => updateQuantity(id, 0)}
          >
            <Icon icon={icons.close__disabled[theme]} />
          </button>
          <img src={image} alt="Image product" className="cartItem__image" />
          <div className="cartItem__title">{name}</div>
        </div>

        <div className="cartItem__wrapperBottom">
          <div className="cartItem__counter-container">
            <button
              className={classNames('cartItem__button', {
                'cartItem__button--disabled': quantity === 1,
              })}
              onClick={() => {
                if (quantity > 1) {
                  updateQuantity(id, quantity - 1);
                }
              }}
            >
              {quantity === 1 ? (
                <Icon icon={icons.arrow_left__disabled[theme]} />
              ) : (
                <Icon icon={icons.arrow_left[theme]} />
              )}
            </button>
            <div className="cartItem__counter">{quantity}</div>
            <button
              className="cartItem__button"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              <Icon icon={icons.arrow_right[theme]} />
            </button>
          </div>

          <div className="cartItem__price">{`$${totalProductPrice}`}</div>
        </div>
      </div>
    );
  },
);

CartItem.displayName = 'CartItem';
