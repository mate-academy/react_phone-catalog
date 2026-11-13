import Footer from '../components/Footer';
import './Cart.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import { Product, LocalProduct } from '../interface/Product';
import CartItem from './CartItem';

const Cart = () => {
  const [data, setData] = useState<Product[]>([]);
  const [cart, setCart] = useState<LocalProduct[]>([]);

  useEffect(() => {
    const storedCart: LocalProduct[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );

    setCart(storedCart);
    const cartIds = storedCart.map(c => c.id);

    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/products.json`,
    )
      .then(response => response.json())
      .then((result: Product[]) => {
        setData(result.filter(item => cartIds.includes(item.itemId)));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const quantity = data.length;

  const productQuantity = function (id: string) {
    return (
      cart.find(c => {
        return c.id === id;
      })?.quantity ?? 1
    );
  };

  const changeQuantity = function (id: string, numb: number) {
    const newCart = cart.map(i => {
      if (i.id !== id) {
        return i;
      }

      const newQuantity = (i.quantity ?? 1) + numb;

      if (newQuantity < 1) {
        return { ...i, quantity: 1 };
      }

      return { ...i, quantity: newQuantity };
    });

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = data.reduce((sum, item) => {
    return sum + item.price * productQuantity(item.itemId);
  }, 0);

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
                    cart.find(c => c.id === item.itemId)?.title ?? item.name
                  }
                  key={item.name}
                  item={item}
                  quantity={productQuantity(item.itemId)}
                  changeQuantity={changeQuantity}
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
