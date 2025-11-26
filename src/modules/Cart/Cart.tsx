import scss from './Cart.module.scss';
import { ButtonBack } from '../shared/components/ButtonBack';
import { CartItem } from './components/CartItem';
import { StorageCartItem } from '../../api/types';

interface Props {
  items: StorageCartItem[];
}

export const Cart: React.FC<Props> = ({ items }) => {
  return (
    <section className={scss.cart}>
      <ButtonBack />
      <h1 className={scss.cart__title}>Cart</h1>
      {items.length > 0 && <CartItem item={items[0]} />}
    </section>
  );
};
