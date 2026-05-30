import { useCart } from '../../context/cart/useCart';
import { BackButton } from '../shared/BackButton';

import s from './CartPage.module.scss';
import { CartProductCard } from './components/CartProductCard';
import { CartTotal } from './components/CartTotal';

export const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className={`${s.cartPage} ${cartItems.length === 0 ? s.isEmpty : ''}`}>
      <BackButton />

      {!!cartItems.length && (
        <>
          <h2 className={s.title}>Cart</h2>

          <section className={s.productList}>
            {cartItems.map(item => {
              return <CartProductCard key={item.product.id} cartItem={item} />;
            })}
          </section>

          <CartTotal />
        </>
      )}
    </div>
  );
};
