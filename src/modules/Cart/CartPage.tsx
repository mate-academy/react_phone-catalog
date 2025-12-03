import { Link } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import { CartProduct } from './CartProduct';
import './cartPage.scss';
import arrowBack from './cartImg/CartBackArrow.svg';
import cartEmpty from '../../../public/img/cart-is-empty.png';
import { useState } from 'react';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const totalPrice = cart.reduce(
    (sum, row) => sum + row.item.price * row.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, row) => sum + row.quantity, 0);

  const handleCheckout = () => {
    setSuccess(true);
    clearCart();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="cart">
      <header className="cart__header">
        <Link to="/" className="cart__back">
          <img src={arrowBack} alt="ArrowBack" className="cart__back-arrow" />
          <span>Back</span>
        </Link>
        <h1 className="cart__title">Cart</h1>
      </header>

      {success && (
        <div className="cart__success">Ваше замовлення успішно відправлено</div>
      )}

      {cart.length === 0 ? (
        <>
          <p className="cart__empty">Your cart is empty</p>
          <img
            src={cartEmpty}
            alt="Product not found"
            className="cart__imgEmpty"
          />
        </>
      ) : (
        <>
          <div className="cart__flex">
            <div className="cart__list">
              {cart.map(row => (
                <CartProduct
                  key={row.item.id}
                  item={row.item}
                  quantity={row.quantity}
                />
              ))}
            </div>
            <div className="cart__summary">
              <p className="cart__totalPrice">${totalPrice}</p>
              <p className="cart__totalInfo">
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <button className="cart__checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
