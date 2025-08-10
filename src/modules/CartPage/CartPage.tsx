import cartPageClass from './CartPage.module.scss';
import cn from 'classnames';
import { CartList } from './components/CartList';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Checkout } from './components/Checkout/Checkout';

export const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const totalItems = cartProducts.reduce(
    (acc, product) => acc + (product.totalCount || 1),
    0,
  );
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * (product.totalCount || 1),
    0,
  );

  return (
    <section className={cn(cartPageClass['cart-page'], 'container')}>
      <h1 className={cn(cartPageClass['cart-page__title'])}>Cart</h1>
      <div className={cn(cartPageClass['cart-page__content'])}>
        <div className={cn(cartPageClass['cart-page__cart-list'])}>
          <CartList cartProducts={cartProducts} />
        </div>
        <div className={cn(cartPageClass['cart-page__checkout'])}>
          <Checkout totalPrice={totalPrice} totalItems={totalItems} />
        </div>
      </div>
    </section>
  );
};
