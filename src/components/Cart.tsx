import { useSelector } from 'react-redux';

import Swal from 'sweetalert';
import Confetti from 'react-confetti';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Products } from '../type/Products';

import { ProductField } from './ProductField';
import { RootState } from '../Reducer/store';

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [showConfetti, setShowConfetti] = useState(false);

  const { t } = useTranslation();

  const totalPrice = cart.reduce(
    (accumulator: number,
      currentValue: Products) => {
      return accumulator + currentValue.price * currentValue.count;
    },
    0,
  );

  const checkoutHandler = () => {
    setShowConfetti(true);
    Swal(
      'Well done!',
      'We are sorry, but this feature is not implemented yet!',
      'success',
    );
  };

  return (
    <div className="cart">
      <h1 className="cart__title">{t('cart')}</h1>

      <div className="cart__content">
        <ul className="cart__list">
          {cart.length ? cart.map((product: Products) => (
            <ProductField product={product} key={product.itemId} />
          )) : <span>{t('cartEmpty')}</span>}
        </ul>

        <div className="cart__summary" data-cy="productQauntity">
          <p className="cart__summary-text">
            <span>{`$${totalPrice}`}</span>
            <span className="cart__summary-total">
              {t('total', { item: cart.length })}
            </span>
          </p>

          <hr />

          <button
            type="button"
            className="cart__checkout-button"
            onClick={() => checkoutHandler()}
          >
            {t('checkout')}
          </button>
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};
