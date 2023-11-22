/* eslint-disable no-alert */
/* eslint-disable max-len */
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types/cartType';
import './Cart.scss';
import close from '../../icons/Close.svg';
import plus from '../../icons/plus.svg';

type Props = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const Cart: React.FC<Props> = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => +item.id !== productId));
  };

  const changeQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (
      +item.id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const buttonDisabled = (cartItem: CartItem) => cartItem.quantity <= 1;

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="return-button"
      >
        Back
      </button>
      {cartItems.length > 0 && <h1 className="title cart-title">Cart</h1>}
      <div className="cart">
        {cartItems.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <h1 className="title">Your cart is empty</h1>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart__list-item">
                  <button
                    type="button"
                    className="cart__list-remove"
                    onClick={() => removeFromCart(item.id)}
                    data-cy="cartDeleteButton"
                  >
                    <img src={close.toString()} alt="close" />
                  </button>
                  <img
                    className="cart__list-img"
                    src={`${process.env.PUBLIC_URL}./_new/${item.product.image}`}
                    alt={item.product.name}
                  />

                  <h3 className="cart__list-title">{item.product.name}</h3>
                  <div className="cart__list-quantity quantity">
                    <button
                      className={classNames('quantity__button', {
                        'quantity__button--disabled': buttonDisabled(item),
                      })}
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" fill={buttonDisabled(item) ? 'rgba(226, 230, 233, 1)' : '#313237'} />
                      </svg>
                    </button>
                    <span data-cy="productQauntity">{item.quantity}</span>
                    <button
                      className="quantity__button button "
                      type="button"
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    >
                      <img src={plus.toString()} alt="plus" />
                    </button>
                  </div>
                  <h3 className="cart__list-price">{`$${item.product.price}`}</h3>
                </li>
              ))}
            </ul>
            <div className="cart__total">
              <div className="cart__total-price">
                <p className="cart__total-price">{`$${totalPrice}`}</p>
                <p className="cart__total-quantity">
                  {`Total for ${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}`}
                </p>
              </div>
              <span className="cart__total-wraper" />
              <button
                type="button"
                className="cart__total-button"
                onClick={() => alert('We are sorry, but this feature is not implemented yet')}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
