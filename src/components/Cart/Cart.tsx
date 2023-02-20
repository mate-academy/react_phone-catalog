import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { Product } from '../../types/Product';
import { CartItem } from '../CartItem/CartItem';
import './Cart.scss';

type Props = {
  products: Product[];
};

export const Cart: React.FC<Props> = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const deleteItem = (productId: string) => {
    setCartItems(
      cartItems.map(item => (
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item)),
    );
  };

  const addItem = (productId: string) => {
    setCartItems(
      cartItems.map(item => (
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item)),
    );
  };

  const itemsAmount = () => {
    return cartItems.map(item => item.quantity)
      .reduce((prev, count) => prev + count, 0);
  };

  const totalPrice = () => {
    return cartItems.map(item => item.quantity
      * (item.price - item.price * (item.discount / 100)))
      .reduce((prev, count) => prev + count, 0);
  };

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>

      {cartItems.length > 0
        ? (
          <div className="cart__main">
            <ul className="cart__list">
              {cartItems.map(item => (
                <li key={item.id}>
                  <CartItem
                    product={item}
                    deleteItem={deleteItem}
                    addItem={addItem}
                  />
                </li>
              ))}
            </ul>

            <div className="cart__totalAmount">
              <h2 className="cart__totalPrice">{`$${totalPrice()}`}</h2>
              <h4 data-cy="productQauntity" className="cart__totalItems">{`Total for ${itemsAmount()} items`}</h4>
              <Link
                className="cart__totalButton"
                type="button"
                to="/checkout"
              >
                Checkout
              </Link>
            </div>
          </div>
        )
        : (<h4 className="cart__empty">Your cart is empty!</h4>)}
    </div>
  );
};
