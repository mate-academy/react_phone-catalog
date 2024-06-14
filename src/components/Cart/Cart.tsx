import { useContext, useMemo } from 'react';
import { BackButton } from '../BackButton';
import { CartContext } from '../../context/CartContext';
import { CartProductCard } from '../CartProductCard';

export const Cart = () => {
  const { cart } = useContext(CartContext);
  const visibleCart = useMemo(
    () => cart.sort((a, b) => a.id.localeCompare(b.id)),
    [cart],
  );

  return (
    <main className="cart flex">
      <BackButton url="home" parentClassName="cart" />
      <h1 className="cart__title">Cart</h1>
      <section className="cart__products">
        {visibleCart.map(crt => (
          <CartProductCard
            parentClassName="cart"
            key={crt.id}
            price={crt.priceDiscount ?? crt.priceRegular}
            cartItem={crt}
          />
        ))}
      </section>
      <section className="cart__total-price"></section>
    </main>
  );
};
