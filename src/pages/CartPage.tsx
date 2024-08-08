import { CartItem } from '../components/CartItem';
import { CardButton } from '../components/ui/CardButton';
import { GoBackLink } from '../components/ui/GoBackLink';

export const CartPage = () => {
  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-page__goback-link">
        <GoBackLink />
      </div>

      <div className="cart-page__title-block">
        <h2>Cart</h2>
      </div>

      <div className="cart-page__content">
        <CartItem />
      </div>

      <div className="cart-page__total">
        <div className="cart-page__price-wrapper">
          <h2>$2657</h2>

          <p className="body-text body-text--gray">Total for 3 items</p>
        </div>

        <CardButton
          style={{ height: '48px' }}
          variant="primary"
          /* eslint-disable-next-line no-console */
          onClick={() => console.log('Checkout')}
        >
          Checkout
        </CardButton>
      </div>
    </div>
  );
};
