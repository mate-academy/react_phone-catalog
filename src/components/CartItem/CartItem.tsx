import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { CartItemType } from '../../helpers/types/CartItemType';
import { MinusIcon } from '../../assets/icons/MinusIcon';
import { PlusIcon } from '../../assets/icons/PlusIcon';
import { decreaseQuantity, increaseQuantity, removeFromCart }
  from '../../store/slices/cartSlice';
import './CartItem.scss';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity, id } = cartItem;
  const dispatch = useDispatch();

  const handleDeleteFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseCount = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseCount = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__wrapper">
        <div className="cart-item__info">
          <button
            type="button"
            className="cart-item__info-close"
            onClick={handleDeleteFromCart}
            data-cy="cartDeleteButton"
          >
            <CloseIcon />
            {}
          </button>

          <div className="cart-item__info-image-wrapper">
            <Link to={`/${product.category}/${product.phoneId}`}>
              <img
                src={`_new/${product.image}`}
                alt={product.name}
                className="cart-item__info-image"
              />
            </Link>
          </div>

          <Link
            to={`/${product.category}/${product.phoneId}`}
            className="cart-item__info-name"
          >
            {product.name}
          </Link>
        </div>

        <div className="cart-item__count">
          <div className="cart-item__count-wrapper">
            <button
              type="button"
              disabled={quantity === 1}
              onClick={handleDecreaseCount}
            >
              <MinusIcon />
              {}
            </button>
            <p
              className="cart-item__count-number"
              data-cy="productQauntity"
            >
              {quantity}
            </p>
            <button
              type="button"
              onClick={handleIncreaseCount}
            >
              <PlusIcon />
              {}
            </button>
          </div>

          <h2 className="cart-item__count-sum">{`$${quantity * product.price}`}</h2>
        </div>
      </div>
    </div>
  );
};
