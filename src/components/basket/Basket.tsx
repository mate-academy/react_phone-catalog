import { Link } from 'react-router-dom';
import './style.scss';
import { useHeaderContext } from '../../provider/HeaderContext';

export const Basket = () => {
  const {
    basketPhones,
    handlerDelete,
  } = useHeaderContext();
  const totalPrice = basketPhones
    .reduce((total, phone) => total + phone.price, 0);

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
          {basketPhones.map(phone => (
            <div className="cart__content" key={phone.id}>
              <button
                type="button"
                className="cart__content-delete"
                onClick={() => handlerDelete(phone)}
              >
                <img src="img/icons/close.svg" alt="close" />
              </button>
              <img
                className="cart__content-image"
                src={phone.image}
                alt="phone_image"
              />
              <p className="cart__content-name">{phone.name}</p>

              <div className="cart__content-buttons">
                <button
                  type="button"
                  className="operation"
                >
                  <img src="img/icons/Minus.svg" alt="minus" />
                </button>
                <p className="result">1</p>
                <button
                  type="button"
                  className="operation"
                >
                  <img src="img/icons/Plus.svg" alt="plus" />
                </button>
              </div>
              <p className="cart__content-price">{`$${phone.price}`}</p>
            </div>
          ))}
        </div>

        {basketPhones.length ? (
          <div className="cart__total">
            <p className="cart__total-price">{`$${totalPrice}`}</p>
            <p className="cart__total-items">{`Total for ${basketPhones.length} items`}</p>
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
