import Footer from '../components/Footer';
import './Cart.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import { Product } from '../interface/Product';
import CartItem from './CartItem';

const Cart = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const cart: string[] = JSON.parse(localStorage.getItem('cart') || '[]');

    fetch('http://localhost:5173/api/products.json')
      .then(response => response.json())
      .then((result: Product[]) => {
        setData(result.filter(item => cart.includes(item.name)));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const quantity = data.length;
  const total = data.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div className="container column">
        <NavPage page="Cart" />
        <h1 className="cart__title">Cart</h1>
        <main className="cart__main">
          <div className="cart__items">
            {data.length === 0 && (
              <p className="cart__empty">No items in cart</p>
            )}
            {data.map(item => {
              return (
                <CartItem
                  key={item.name}
                  item={item}
                  total={total}
                  quantity={quantity}
                />
              );
            })}
          </div>
          <aside className="cart__aside">
            <span className="cart__price">${total}</span>
            <span className="cart__details">Total for {quantity} items</span>
            <div className="cart__line"></div>
            <button
              className="cart__button"
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');

                localStorage.setItem('cart', JSON.stringify(cart));
              }}
            >
              Checkout
            </button>
          </aside>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
