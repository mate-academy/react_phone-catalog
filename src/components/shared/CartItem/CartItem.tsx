import React, { useContext, useMemo } from 'react';
import './CartItem.scss';
import { Cart } from '../../../types/Cart';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons';
import { Link } from 'react-router-dom';
import { ButtonIcon } from '../ButtonIcon';

type Props = {
  cartItem: Cart;
};

export const CartItem: React.FC<Props> = ({
  cartItem: {
    itemId,
    product: { name, price, image, category },
    quantity,
  },
}) => {
  const { removeFromCart, changeCartQuantity } = useContext(GlobalContext);

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <div
          className="cart-item__icon-close"
          onClick={() => removeFromCart(itemId)}
        >
          <Icon icon={icons.closeLight} />
        </div>

        <Link to={`/${category}/${itemId}`} className="cart-item__link">
          <img src={image} alt="Product image" className="cart-item__image" />
          <p className="cart-item__title">{name}</p>
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__counter">
          <ButtonIcon
            icon={icons.minus}
            iconDisabled={icons.minusLight}
            isDisabled={quantity <= 1}
            handleOnClick={() => {
              if (quantity > 1) {
                changeCartQuantity(itemId, quantity - 1);
              }
            }}
          />

          <p className="cart-item__counter-text">{quantity}</p>

          <ButtonIcon
            icon={icons.plus}
            handleOnClick={() => {
              changeCartQuantity(itemId, quantity + 1);
            }}
          />
        </div>

        <div className="cart-item__price">{'$' + totalPrice}</div>
      </div>
    </div>
  );
};
