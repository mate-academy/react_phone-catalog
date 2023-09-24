import { Link } from 'react-router-dom';
import './style.scss';
import { useHeaderContext } from '../../provider/HeaderContext';
import { Phone } from '../../types/phone';

export const Basket = () => {
  const {
    basketItems,
    handlerDelete,
    increaseItemCount,
    decreaseItemCount,
  } = useHeaderContext();
  const totalPrice = basketItems
    .reduce((total, item) => total + item.phone.price * item.count, 0);
  const totalItemCount = basketItems
    .reduce((total, item) => total + item.count, 0);

  const handleAddCount = (phone: Phone) => {
    const basketItem = basketItems.find(item => item.phone.id === phone.id);

    if (basketItem) {
      increaseItemCount(phone.id);
    }
  };

  const handleMinusCount = (phone: Phone) => {
    const basketItem = basketItems.find(item => item.phone.id === phone.id);

    if (basketItem) {
      decreaseItemCount(phone.id);
    }
  };

  return (
    <div className="cart">
      <div className="cart__up">
        <img
          className="cart__up-image"
          src="./img/icons/left.svg"
          alt="left"
        />
        <Link className="cart__up-back" to="/">Back</Link>
      </div>
      <h1 className="cart__title">Cart</h1>

      <div className="box">
        <div className="box__items">
          {basketItems.map(item => (
            <div className="cart__content" key={item.phone.id}>
              <button
                type="button"
                className="cart__content-delete"
                onClick={() => handlerDelete(item.phone)}
              >
                <img src="img/icons/close.svg" alt="close" />
              </button>
              <img
                className="cart__content-image"
                src={item.phone.image}
                alt="phone_image"
              />
              <p className="cart__content-name">{item.phone.name}</p>

              <div className="cart__content-buttons">
                <button
                  type="button"
                  className="operation"
                  onClick={() => handleMinusCount(item.phone)}
                >
                  <img
                    className="operation__item"
                    src="img/icons/Minus.svg"
                    alt="minus"
                  />
                </button>
                <p className="result">{item.count}</p>
                <button
                  type="button"
                  className="operation"
                  onClick={() => handleAddCount(item.phone)}
                >
                  <img
                    className="operation__item"
                    src="img/icons/Plus.svg"
                    alt="plus"
                  />
                </button>
              </div>
              <p className="cart__content-price">{`$${item.phone.price * item.count}`}</p>
            </div>
          ))}
        </div>

        {basketItems.length ? (
          <div className="cart__total">
            <p className="cart__total-price">{`$${totalPrice}`}</p>
            <p className="cart__total-items">{`Total for ${totalItemCount} items`}</p>
            <div className="cart__total-line" aria-label="line" />
            <button
              type="button"
              className="cart__total-button"
            >
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Basket;
