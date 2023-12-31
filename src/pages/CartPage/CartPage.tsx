import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import arrowLeft from '../../images/arrow-left-black.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { Phone } from '../../Types/Phone';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartPhones, setCartPhones } = useProducts();
  const [amount, setAmount] = useState(1);
  const totalPrice = cartPhones.reduce((acc, phone) => +acc + +phone.price, 0);

  // const phonesAmount = [...cartPhones].map(phone => { ...phone, amount: 1});

  const deleteFromCart = (id: string) => {
    const setOfPhones = new Set([...cartPhones]);

    const newPhones: Phone[] = Array.from(setOfPhones)
      .filter(phone => phone.id !== id);

    setCartPhones(newPhones);
  };

  return (
    <>
      <div className="cart-container">
        <button
          type="button"
          className="left-back"
          onClick={() => navigate(-1)}
          data-cy="backButton"
        >
          <img src={arrowLeft} alt="arrow_right" />
          <p>Back</p>
        </button>
        <h1 className="cart-title">Cart</h1>
        {cartPhones.length > 0 ? (
          <div className="cart">
            <ul className="cart__list">
              {cartPhones.map(phone => (
                <li className="cart__item" key={phone.id}>
                  <button
                    type="button"
                    className="cart__button cart__delete"
                    aria-label="delete"
                    onClick={() => deleteFromCart(phone.id)}
                  />
                  <img
                    className="cart__image"
                    src={phone.image}
                    alt={phone.name}
                  />
                  <div>{phone.name}</div>
                  <button
                    type="button"
                    aria-label="decrease"
                    className="cart__button cart__minus"
                  />
                  <div>{amount}</div>
                  <button
                    type="button"
                    aria-label="increase"
                    className="cart__button cart__plus"
                  />
                  <div>{`$${phone.price}`}</div>
                </li>
              ))}
            </ul>
            <div className="cart__aside">
              <div className="cart__price-container">
                <div className="cart__price">{`$${totalPrice}`}</div>
                <div className="cart__total">{`Total for ${cartPhones.length} items`}</div>
              </div>
              <div className="cart__checkout card__link">Checkout</div>
            </div>
          </div>
        ) : (
          <h2>Cart is empty</h2>
        )}
      </div>
    </>
  );
};
