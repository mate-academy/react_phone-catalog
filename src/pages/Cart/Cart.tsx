import { useEffect, useMemo, useState } from 'react';
import { getCart, removeFromCart, updateInCart } from '../../api/cart';
import { BackButton } from '../../components/BackButton';
import { CartItemType } from '../../types/CartItemType';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api/api';
import { CartItem } from './components/CartItem';
import './Cart.scss';

type Item = CartItemType & ProductType;

export const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const cart = getCart();

    const response = await getProducts({
      itemIds: cart.map(item => item.itemId),
    });

    const items: Item[] = [];

    for (const item of cart) {
      items.push({
        ...item,
        ...response.products.find(product => product.itemId === item.itemId)!,
      });
    }

    setItems(items);
  };

  const removeItem = (itemId: string) => {
    removeFromCart(itemId);

    fetchItems();
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!items) return;

    const newItems = [...items];

    const item = newItems.find(item => item.itemId === itemId);

    if (!item) {
      return;
    }

    item.quantity = quantity;

    updateInCart(itemId, quantity);
    setItems(newItems);
  };

  const totalAmount = useMemo(() => {
    if (!items.length) {
      return 0;
    }

    const prices = items.map(
      (product, index) => product.price * items[index].quantity,
    );

    const total = prices.reduce((prev, current) => (prev += current));

    return total;
  }, [items, items]);

  useEffect(() => {
    fetchItems();
  }, []);

  if (!items) {
    return;
  }

  return (
    <div className="cart">
      <BackButton />

      <h1 className="cart__title">Cart</h1>

      <div className="cart__container">
        {!!items.length ? (
          <>
            <div className="cart__products">
              {items.map((item, index) => (
                <CartItem
                  product={item}
                  quantity={item.quantity}
                  handleQuantity={updateQuantity}
                  handleRemove={removeItem}
                  key={index}
                />
              ))}
            </div>

            <div className="cart__summary">
              <h2 className="cart__summary-amount h2--desktop">
                ${totalAmount}
              </h2>
              <p className="cart__summary-items body-text">
                Total for{' '}
                {items.reduce((prev, item) => item.quantity + prev, 0)} items
              </p>

              <div className="divider-line"></div>

              <button className="cart__summary-button">Checkout</button>
            </div>
          </>
        ) : (
          <>
            <div className="cart__empty">
              <h2>Cart is empty</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
