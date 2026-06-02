/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { useCart } from '@/modules/shared/utils/context/CartContext';

import styles from './CartPage.module.scss';
import { CartItem } from './components/CartItem';
import { CartTotal } from './components/CartTotal';
import { BackButton } from '@/modules/shared/components/BackButton';

const {
  cartPage,
  title,
  content,
  itemList,
} = styles;

export const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className={cartPage}>
      <BackButton />

      <h1 className={title}>Cart</h1>

      <div className={content}>

        <div className={itemList}>
          {cart.map(item => (
            <CartItem key={item.product.id} cart={item} />
          ))}
        </div>

        <CartTotal />
      </div>
    </div>
  );
};
