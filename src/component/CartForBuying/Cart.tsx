import { BackButton } from '../BackButton';
import './Cart.scss';
import { useEffect, useState } from 'react';
import { ProductItem } from '../types/Phone';

export const Cart = () => {
  const [cartToBuying, setCartToBuying] = useState<ProductItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }

        return response.json();
      })
      .then((data: ProductItem[]) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const cart: string[] = JSON.parse(
      localStorage.getItem('cartForBuying') || '[]',
    );
    const savedCounts: { [key: string]: number } = JSON.parse(
      localStorage.getItem('countItems') || '{}',
    );

    const defaultCounts: { [key: string]: number } = {};

    cart.forEach(id => {
      defaultCounts[id] = savedCounts[id] || 1;
    });

    setCounts(defaultCounts);

    const items = products.filter(item => cart.includes(item.itemId));

    setCartToBuying(items);
  }, [products]);

  const updateCount = (id: string, delta: number) => {
    const newCount = Math.max(1, (counts[id] || 1) + delta);
    const updatedCounts = { ...counts, [id]: newCount };

    setCounts(updatedCounts);
    localStorage.setItem('countItems', JSON.stringify(updatedCounts));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartToBuying.filter(item => item.itemId !== id);
    const updatedCounts = { ...counts };

    delete updatedCounts[id];

    setCartToBuying(updatedCart);
    setCounts(updatedCounts);

    localStorage.setItem(
      'cartForBuying',
      JSON.stringify(updatedCart.map(item => item.itemId)),
    );
    localStorage.setItem('countItems', JSON.stringify(updatedCounts));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0,
  );
  const totalPrice = cartToBuying.reduce(
    (sum, item) => sum + item.price * (counts[item.itemId] || 1),
    0,
  );

  return (
    <div className="main__carts">
      <BackButton />
      <h1 className="title cart__title">Cart</h1>
      <section className="carts__section">
        {cartToBuying.map((item, index) => (
          <div key={index} className="cart">
            <button
              className="button__delete button"
              onClick={() => removeFromCart(item.itemId)}
            ></button>
            <div
              className="cart__main-image"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="item__name">{item.name}</div>
            <div className="count__buying-item button">
              <button
                className="subtract cart__buttons button"
                onClick={() => updateCount(item.itemId, -1)}
              ></button>
              <span className="count-for-buying">
                {counts[item.itemId] || 1}
              </span>
              <button
                className="add-to-count cart__buttons button"
                onClick={() => updateCount(item.itemId, 1)}
              ></button>
            </div>
            <div className="cart__price">
              ${(counts[item.itemId] || 1) * item.price}
            </div>
          </div>
        ))}
      </section>

      <section className="cart__second-section">
        <h1 className="total__value">${totalPrice}</h1>
        <div className="total__items">Total for {totalCount} items</div>
        <button className="buy button-add">Checkout</button>
      </section>
    </div>
  );
};
