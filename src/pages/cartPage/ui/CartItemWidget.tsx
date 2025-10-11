import { CartItem } from '@features/globalStore/types';
import { useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { CrossIcon } from '@shared/icons';
import { Product } from '@shared/types';
import { useEffect } from 'react';
import styles from '../styles/CartItemWidget.module.scss';

type Props = {
  item: CartItem;
  updatePrice: (id: string, price: number) => void;
};

export const CartItemWidget = ({ item, updatePrice }: Props) => {
  const { items, loadItems } = useLoadItems(() => get.product(item.id));

  useEffect(() => {
    loadItems();
  }, [item.id]);

  useEffect(() => {
    if (typeof items !== 'string') {
      updatePrice(item.id, (items as Product).priceRegular);
    }
  }, [typeof items]);

  return (
    <li>
      {typeof items === 'string' ? (
        <span>Loading...</span>
      ) : (
        <section className={styles['item-container']}>
          <h3 className={styles.name}>{(items as Product).name}</h3>

          <img src={(items as Product).images[0]} className={styles.image} />

          <button className={styles.clear}>
            <CrossIcon />
          </button>
          <div className={styles['buttons-block']}>
            <button className={styles.button}>-</button>
            <output className={styles.output}>{item.amount}</output>
            <button className={styles.button}>+</button>
          </div>
          <span className={styles.price}>
            {`$${(items as Product).priceRegular}`}
          </span>
        </section>
      )}
    </li>
  );
};
