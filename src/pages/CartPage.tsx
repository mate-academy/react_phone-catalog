import { useContext } from 'react';
import { Cart } from '../components/Cart/Cart';
import { TechProductsContext } from '../stores/TechProductsContext';
import { ButtonBack } from '../components/ButtonBack/ButtonBack';

export const CartPage = () => {
  const {
    cart,
  } = useContext(TechProductsContext);

  return (
    <section className="App__cart cart-page">
      <div className="container">
        <div className="cart-page__content">
          <ButtonBack />

          <h1 className="cart-page__title">Cart</h1>

          {
            cart.length > 0 ? <Cart /> : <h3>Your cart is empty</h3>
          }
        </div>
      </div>
    </section>
  );
};
