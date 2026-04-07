import style from './CartPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';

export const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className={style.cartPage}>
      <div className={style.cartPage__containerBreadcrumbs}>
        <Breadcrumbs category="Cart" />
      </div>

      <h1 className={style.cartPage__title}>Cart</h1>

      <div className={style.cartPage__itemContainer}>
        {cartItems.map(item => (
          <div key={item.id}>
            <CartItem item={item} />
          </div>
        ))}
      </div>

      <div className={style.cartPage__totalContainer}>
        <CartTotal />
      </div>
    </div>
  );
};
