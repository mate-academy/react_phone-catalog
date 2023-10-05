import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Helpers/CartContex';
import './CartPage.scss';
import { Product } from '../../Helpers/Types/Product';
import { Loader } from '../../Components/Loader/Loader';

export const CartPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleCheckout = () => {
    setShowMessage(true);
  };

  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    productQuantities,
    totalItems,
    handleDecrement,
    handleIncrement,
    productPrice,
    sum,
    setSum,
    buttonStates,
    setButtonStates,
  } = useCart();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product.id);
    setSum((prevSum) => prevSum - productPrice(product));

    const newButtonStates = { ...buttonStates };

    newButtonStates[product.id] = false;

    setButtonStates(newButtonStates);

    localStorage.setItem('buttonStates', JSON.stringify(newButtonStates));
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [showMessage]);

  if (!cart) {
    return <Loader />;
  }

  return (
    cart.length === 0 ? (
      <p className="cart__warning">Your cart is empty</p>
    ) : (
      <div className="cart">
        <button
          type="button"
          data-cy="backButton"
          onClick={handleGoBack}
          className="cart__back-btn"
        >
          <div className="cart__button-content">
            <img
              src="images/ArrowBlack.svg"
              alt="GoBack"
              className="cart__back-img"
            />

            <p className="cart__string">Back</p>
          </div>
        </button>

        <h1 className="cart__title">Cart</h1>

        <div className="cart__content">
          <ul className="cart__items">
            {cart.map((item) => (
              <div className="cart__container" key={item.id}>
                <button
                  type="button"
                  className="cart__btn cart__btn--delete"
                  data-cy="cartDeleteButton"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <img src="images/Close.svg" alt="Delete the item" />
                </button>

                <li className="cart__item">
                  <img
                    src={item.imageUrl}
                    alt="Product"
                    className="cart__img"
                  />

                  <p className="cart__text">{item.name}</p>
                </li>

                <div className="cart__buttons">
                  <button
                    type="button"
                    className="cart__btn cart__btn--minus"
                    onClick={() => handleDecrement(item)}
                    disabled={productQuantities[item.id] <= 1}
                  >
                    {productQuantities[item.id] <= 1 ? (
                      <img src="images/MinusDisabled.svg" alt="Minus product" />
                    ) : (
                      <img src="images/Minus.svg" alt="Minus product" />
                    )}
                  </button>

                  <span className="cart__text cart__text--number">
                    {productQuantities[item.id] || 1}
                  </span>

                  <button
                    type="button"
                    className="cart__btn cart__btn--add"
                    onClick={() => handleIncrement(item)}
                  >
                    <img src="images/Plus.svg" alt="Add product" />
                  </button>
                </div>

                <p className="cart__item-price">
                  $
                  {productPrice(item)}
                </p>
              </div>
            ))}
          </ul>

          <div className="cart__total">
            <p className="cart__sum">
              $
              {sum}
            </p>
            <p className="cart__quantity" data-cy="productQauntity">
              Total for
              {' '}
              {totalItems}
              {' '}
              {totalItems === 1 ? ('item') : ('items')}
            </p>
            <hr className="cart__line" />
            <button
              type="button"
              className="cart__checkout"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <div className={`cart__message-container ${showMessage ? 'cart__message-container--visible' : ''}`}>
              <p className="cart__message">
                We are sorry, but this feature is not implemented yet
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  );
};
