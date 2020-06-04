import { Link } from 'react-router-dom';
import './CartPage.scss';
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../helpers/CartContext';
import CartProduct from './CartProduct';

const CartPage = () => {
  const {
    itemInCart, setTotalCount, totalCount, setTotalCost, totalCost,
  } = useContext(CartContext);

  useEffect(() => {
    setTotalCount(itemInCart.length);
    setTotalCost(itemInCart.reduce((prev, item) => {
      return prev + item.price;
    }, 0));
  }, []);

  return (
    <div className="cart-page">
      <section className="back-link">
        <Link to="/" className="nav-location__back-link">
          <img src="./img/ArrowRightActive.svg" alt="arrow" className="back-link-arrow" />
          <p className="back-link__text">Back</p>
        </Link>
      </section>
      <section className="phones-page__article mt">
        <h2 className="phones-page__article-title">Cart</h2>
      </section>
      <section className="cart-page__list">
        <ul className="cart-page__cards">
          {itemInCart.map((item) => (
            <li key={item.id}>
              <CartProduct item={item} />
            </li>
          ))}
        </ul>
        <div className="cart-page__buy-block buy-block">
          <p className="buy-block__price">
            $
            {totalCost}
          </p>
          <p className="buy-block__count">
            Total for
            {' '}
            {totalCount}
            {' '}
            items
          </p>
          <span className="buy-block__line" />
          <a href="https://api.fondy.eu/s/sdrfHF5fPLzVET6" type="button" className="buy-block__button">Checkout</a>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
