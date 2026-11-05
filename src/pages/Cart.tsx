import Footer from '../components/Footer';
import './Cart.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import { Product } from '../interface/Product';

const Cart = () => {
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setData(favorites);
    setQuantity(favorites.length);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5173/api/products.json')
      .then(response => response.json())
      .then(result => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        const favoriteProducts = result.filter((item: Product) =>
          favorites.includes(item.name),
        );

        setData(favoriteProducts);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [data]);

  return (
    <div className="cart">
      <div className="container column">
        <NavPage page="Cart" />
        <h1 className="cart__title">Cart</h1>
        <main className="cart__">
          <div className="cart__items"></div>
          <aside>
            <span className="cart__price">$2500</span>
            <span className="cart__details">Total for {quantity} items</span>
            <div className="cart__line"></div>
            <button className="cart__button">Checkout</button>
          </aside>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
