import { useGlobalContext } from '../../context/GlobalContext';
import { CartItems } from './components/CartItems';
import './CartPage.scss';
import { ButtonBack } from '../shared/components/Buttons/ButtonBack';
import { TotalPrice } from './components/TotalPrice';
import { useLanguage } from '../../context/LanguageContext';

export const CartPage = () => {
  const { cartItems } = useGlobalContext();
  const { texts } = useLanguage();

  return (
    <div className="cart-page">
      <div className="container container--cart-item">
        <section className="section section--header">
          <ButtonBack className="cart-page__button-back" />
        </section>

        <section className="section section--body">
          <h2 className="cart-page__title">
            {cartItems.length > 0 ? texts.cart : texts.yourCartIsEmpty}
          </h2>
          {cartItems.length > 0 && (
            <div className="cart-page__body">
              <CartItems className="cart-page__cart-items" />
              <TotalPrice className="cart-page__total-price" />
            </div>
          )}
          {cartItems.length === 0 && (
            <div className="cart-page__body">
              <img
                className="cart-page__cart-is-empty-img"
                src="/img/cart-is-empty.png"
                alt="cart-is-empty"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
