import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../ContextStor';

export const CartItem = () => {
  const { cart, setCart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const sumCart = () => {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price * quantities[i]; // Зміна тут: множимо ціну на кількість
    }

    return sum;
  };

  const handleRemoveItem = (productId: number) => {
    const updatedCart = cart.filter(product => product.id !== productId);

    setCart(updatedCart);
  };

  const handleIncrease = (index: number) => {
    const newQuantities = [...quantities];

    newQuantities[index] += 1;

    setQuantities(newQuantities);
  };

  const handleDecrease = (index: number) => {
    const newQuantities = [...quantities];

    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
    }

    setQuantities(newQuantities);
  };

  return (
    <>
      <div className="details__back">
        <img
          style={{ cursor: 'pointer' }}
          src="./img/Icons_Chevron (Arrow Right).svg"
          alt="Home"
        />
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(`${location.state.from}`);
          }}
          className="details__back--text"
        >
          Back
        </p>
      </div>

      <h1>Cart</h1>
      <p>{cart.length} items</p>

      <div className="cart__flex">
        {cart.map((el, index) => (
          <div key={el.id} className="cart__card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '16px',
              }}
            >
              <img
                onClick={() => handleRemoveItem(el.id)}
                className="cart__card-close"
                src="./img/Icons_Close.png"
              />
              <img
                onClick={() => navigate(`/${el.category}/${el.itemId}`)}
                className="cart__card-img"
                src={el.image}
                style={{ cursor: 'pointer' }}
              />
              <p>{el.name}</p>
            </div>

            <div
              className="cart__card--second-div"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className="cart__counter">
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleIncrease(index)}
                  className="cart__counter-text"
                >
                  +
                </button>
                <p>{quantities[index]}</p>
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDecrease(index)}
                  className="cart__counter-text"
                  disabled={quantities[index] === 1}
                >
                  -
                </button>
              </div>
              <p className="cart__card-price">
                ${el.price * quantities[index]}
              </p>
            </div>
          </div>
        ))}

        <div className="cart__checkout">
          <h2 className="cart__text">{`$${sumCart()}`}</h2>
          <p>Total for {cart.length} items</p>
          <div className="cart__line"></div>
          <button className="card__buy-cart">Checkout</button>
        </div>
      </div>
    </>
  );
};
