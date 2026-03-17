import React, { useContext } from 'react';
import '../../styles/style.scss';
import { CartItem } from '../../types/CartItem';
import { CartsContext } from '../../components/Context/CartsContext';
import { useNavigate } from 'react-router-dom';
import arrowIconLeft from '../../logos/Main/Arrow__Left.svg';
import logoClose from '../../logos/Main/Close.svg';

export const CartsPage = () => {
  const { carts, setCarts } = useContext(CartsContext);

  const navigate = useNavigate();
  const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const increase = (item: CartItem) => {
    setCarts(prev =>
      prev.map(p =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  };

  const decrease = (item: CartItem) => {
    setCarts(prev =>
      prev.map(p =>
        p.id === item.id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p,
      ),
    );
  };

  const deleteCart = (item: CartItem) => {
    setCarts(prev => prev.filter(c => c.id !== item.id));
  };

  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      setCarts([]);
    }
  };

  if (carts.length === 0) {
    return (
      <div className="page__notFound">
        <h1>Your cart is empty :&#40;</h1>
        <img src="/img/cart-is-empty.png" alt="cartempty" />
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <div className="cart__back">
          <div className="cart__back--navigate" onClick={() => navigate(-1)}>
            <img
              src={arrowIconLeft}
              alt="Logo arrow"
              className="cart__back--arrow"
            ></img>
          </div>
          <div className="cart__back--title" onClick={() => navigate(-1)}>
            Back
          </div>
        </div>
        <h1 className="title">Cart</h1>
        {/* {carts.length === 0 && (
          <div className="cart__notFound">
            <h1>Cart is empty</h1>
            <img src="../../public/img/cart-is-empty.png" alt="cartempty" />
          </div>
        )} */}
        <div className="cart">
          <div className="cart__container">
            {carts.map(c => (
              <>
                <div className="cart__productCard" key={c.id}>
                  <div className="cart__leftContainer">
                    <div className="cart__close">
                      <button
                        className="cart__delete"
                        onClick={() => deleteCart(c)}
                      >
                        <img
                          className="cart__delete--close"
                          src={logoClose}
                          alt="Logo"
                        />
                      </button>
                    </div>
                    <div className="cart__img">
                      <img
                        src={c.image}
                        alt="cartImg"
                        className="cart__img--photo"
                      />
                    </div>
                    <div className="cart__title">{c.name}</div>
                  </div>
                  <div className="cart__rightContainer">
                    <div className="cart__amount">
                      <button
                        className="cart__button"
                        onClick={() => decrease(c)}
                        disabled={c.quantity === 1}
                      >
                        -
                      </button>
                      <span className="cart__button--title">{c.quantity}</span>
                      <button
                        className="cart__button"
                        onClick={() => increase(c)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart__price text-h3">${c.price}</div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="cart__totalSum">
            <div className="cart__totalSum--price text-h2">${totalPrice}</div>
            <div className="cart__totalSum--title">
              Total for {totalItems} items
            </div>
            <button className="cart__totalSum__button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
