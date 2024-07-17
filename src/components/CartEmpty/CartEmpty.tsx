import emptyCart from '../../images/cart-is-empty.png';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const CartEmpty = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="cart__no-product-message">
        {t(TRANSLATIONS.cart.empty.title)}
      </h2>
      <div className="cart__no-product-image-frame">
        <img
          src={emptyCart}
          alt={t(TRANSLATIONS.cart.empty.image.alt)}
          className="cart__no-product-image"
        />
      </div>
    </>
  );
};
