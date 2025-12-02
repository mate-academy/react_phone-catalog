import { Link } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import { CartProduct } from './CartProduct';
import './cartPage.scss';
import arrowBack from './cartImg/CartBackArrow.svg';

export const CartPage: React.FC = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce(
    (sum, row) => sum + row.item.price * row.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, row) => sum + row.quantity, 0);

  return (
    <section className="cart">
      <header className="cart__header">
        <Link to="/" className="cart__back">
          <img src={arrowBack} alt="ArrowBack" className="cart__back-arrow" />
          <span>Back</span>
        </Link>
        <h1 className="cart__title">Cart</h1>
      </header>

      {cart.length === 0 ? (
        <p className="cart__empty">Your cart is empty</p>
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
              <button className="cart__checkout">Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
