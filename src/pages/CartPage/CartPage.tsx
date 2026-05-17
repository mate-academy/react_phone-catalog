import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import s from './CartPage.module.scss';
import { CartItem } from '@components/cart/CartItem/CartItem';
import { CartProduct } from '@components/cart/CartProduct/CartProduct';
import { BackButton } from '@components/ui/Buttons/Back/BackButton';
import { useAppContext } from '@hooks/useAppContext';
import { CheckoutModal } from '@components/common/CheckoutModal';
import cartZeroImg from '@assets/cart-zero.png';

export const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useAppContext();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className={s.cart}>
      <BackButton />

      <div className={s.title}>
        <h1>{t('cart.title')}</h1>
      </div>

      {cartItems.length === 0 ?
        <div className={s.emptyCart}>
          <div className={s.imgWrapper}>
            <img
              className={s.img}
              src={cartZeroImg}
              alt="Empty Cart"
            />
          </div>

          <p>{t('cart.empty')}</p>

          <Link
            to="/"
            className={s.addToCart}
          >
            {t('cart.shop_now', 'Shop now')}
          </Link>
        </div>
      : <div className={s.cartContent}>
          <div className={s.products}>
            {cartItems.map((item) => (
              <CartProduct
                key={item.itemUniqueId}
                product={item}
                onRemove={() => removeFromCart(item.itemUniqueId)}
                onIncrease={() =>
                  updateQuantity(item.itemUniqueId, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.itemUniqueId, item.quantity - 1)
                }
              />
            ))}
          </div>

          <div className={s.summary}>
            <CartItem
              totalPrice={totalPrice}
              totalItems={totalItems}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      }

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};
