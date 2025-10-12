import { CartItem } from '@features/globalStore/types';
import { CrossIcon } from '@shared/icons';
import { Product } from '@shared/types';
import styles from '../styles/CartItemWidget.module.scss';
import { useCartItemWidget } from '../model';
import { CartItemSkeleton } from './CartItemSkeleton';

type Props = {
  cartItem: CartItem;
  updatePrice: (id: string, price: number) => void;
};

export const CartItemWidget = ({ cartItem, updatePrice }: Props) => {
  const { items, onButton, getPrice } = useCartItemWidget({
    cartItem,
    updatePrice,
  });

  return (
    <li>
      {typeof items === 'string' ? (
        <CartItemSkeleton />
      ) : (
        <section className={styles['item-container']}>
          <h3 className={styles.name}>{(items as Product).name}</h3>

          <img src={(items as Product).images[0]} className={styles.image} />

          <button className={styles.clear} onClick={() => onButton(-Infinity)}>
            <CrossIcon />
          </button>
          <div className={styles['buttons-block']}>
            <button className={styles.button} onClick={() => onButton(-1)}>
              -
            </button>
            <output className={styles.output}>{cartItem.amount}</output>
            <button className={styles.button} onClick={() => onButton(1)}>
              +
            </button>
          </div>
          <span className={styles.price}>{getPrice()}</span>
        </section>
      )}
    </li>
  );
};
