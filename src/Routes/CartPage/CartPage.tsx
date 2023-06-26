import { BackButton } from '../../components/Buttons/BackButton/BackButton';
import { CartEl } from '../../components/CartEl/CartEl';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { NavbarCart } from '../../components/Navbar/NavbarCart';
import './CartPage.scss';

export const CartPage = () => {
  return (
    <>
      <NavbarCart />

      <main className="cart">
        <div className="cart__back">
          <BackButton />
        </div>

        <h1 className="cart__title">Cart</h1>

        <div className="cart__container">
          <ul className="cart__list">
            <li>
              <CartEl />
            </li>
            <li>
              <CartEl />
            </li>
          </ul>

          <CartSummary />
        </div>
      </main>
    </>
  );
};
