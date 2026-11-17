import Footer from '../components/Footer';
import './Cart.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import { Product, LocalProduct } from '../interface/Product';
import CartItem from './CartItem';

const Cart = ({
  products,
  setProducts,
}: {
  products: LocalProduct[];
  setProducts: (list: LocalProduct[]) => void;
}) => {
  const [catalog, setCatalog] = useState<Product[]>([]);

  // lint error

  const API_URL =
    'https://johnnyvasconcelos.github.io/' +
    'react_phone-catalog/api/products.json';

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then((result: Product[]) => setCatalog(result))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const data = catalog.filter(item => products.some(p => p.id === item.itemId));

  const quantity = data.length;

  const productQuantity = function (id: string) {
    return products.find(p => p.id === id)?.quantity ?? 1;
  };

  const changeQuantity = function (id: string, numb: number) {
    const newCart = products.map(i => {
      if (i.id !== id) {
        return i;
      }

      const newQuantity = (i.quantity ?? 1) + numb;

      if (newQuantity < 1) {
        return { ...i, quantity: 1 };
      }

      return { ...i, quantity: newQuantity };
    });

    setProducts(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = data.reduce((sum, item) => {
    return sum + item.price * productQuantity(item.itemId);
  }, 0);

  const removeItem = function (id: string) {
    const updated = products.filter(p => p.id !== id);

    setProducts(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

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
                  title={
                    products.find(p => p.id === item.itemId)?.title ?? item.name
                  }
                  key={item.name}
                  item={item}
                  quantity={productQuantity(item.itemId)}
                  changeQuantity={changeQuantity}
                  removeItem={removeItem}
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
                const car = JSON.parse(localStorage.getItem('cart') || '[]');

                localStorage.setItem('cart', JSON.stringify(car));
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
