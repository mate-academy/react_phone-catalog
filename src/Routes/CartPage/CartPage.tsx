import { BackButton } from '../../components/Buttons/BackButton/BackButton';
import { CartEl } from '../../components/CartEl/CartEl';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { NavbarCart } from '../../components/Navbar/NavbarCart';
import { useCart } from '../../contexts/cartContext';
import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useCart();

  const sumPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  );
  const itemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <NavbarCart />
      <main className="cart">
        <div className="cart__back">
          <BackButton />
        </div>

        <h1 className="cart__title">Cart</h1>

        {itemsCount > 0 && (
          <div className="cart__container">
            <ul className="cart__list">
              {cartItems.map(({ product, id, quantity }) => (
                <li key={id}>
                  <CartEl product={product} quantity={quantity} />
                </li>
              ))}
            </ul>

            <CartSummary count={itemsCount} sumPrice={sumPrice} />
          </div>
        )}
      </main>
    </>
  );
};
