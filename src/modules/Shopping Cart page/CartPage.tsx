import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const [cart, setCart] = useState<ProductType[]>([]);
  const total = cart.reduce((acc, product) => acc + product.priceDiscount, 0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/cart.json');
      const data: ProductType[] = await response.json();

      setCart(data);
      localStorage.setItem('cart', JSON.stringify(data));
    };

    const isValidStoredData = (data: string | null) => {
      return data && JSON.parse(data).length > 0;
    };

    const storedCart = localStorage.getItem('cart');

    if (isValidStoredData(storedCart)) {
      setCart(JSON.parse(storedCart as string));
    } else {
      fetchData();
    }
  }, [cart]);

  return (
    <section className="cart container">
      <div className="cart__back">
        <img
          src="../../../img/slider/svg/chevron (arrow left).svg"
          alt="chevron_left"
        />
        <Link to={`/`} className="cart__link">
          Back
        </Link>
      </div>

      <h1 className="cart__title">Cart</h1>

      <div className="cart__block">
        {cart.map(product => (
          <article key={product.id} className="item">
            <div className="item__info">
              <img src="../../../img/cart/close.svg" alt="close" className="item__info--close" />
              <img src={product?.images[0]} alt={`${product?.name}`} className="item__info--product" />
              <span className="item__info--name">{product?.name}</span>
            </div>
            <div className="item__amount">
              <div className="item__amount--count">
                <button className="item__amount--count-button">
                  <img src="../../../img/cart/minus.svg" alt="minus" />
                </button>
                <span className="item__amount--count-number">1</span>
                <button className="item__amount--count-button">
                  <img src="../../../img/cart/plus.svg" alt="plus" />
                </button>
              </div>
              <span className="item__amount--price">${product?.priceDiscount}</span>
            </div>
          </article>
        ))}
        <div className="cart__total">
          <span className="cart__total--total">${total}</span>
          <span className="cart__total--text">Total for {cart.length} items</span>
          <div className="cart__line"></div>
          <button className="cart__checkout">Checkout</button>
        </div>
      </div>
    </section>
  );
};
