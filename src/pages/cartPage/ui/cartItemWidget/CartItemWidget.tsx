import { CartItem } from '@features/globalStore/types';
import { CrossIcon } from '@shared/icons';
import { Product } from '@shared/types';
import styles from './CartItemWidget.module.scss';
import { useCartItemWidget } from '../../model';
import { getCartWindetParams } from '../../model/getCartWidgetParams';
import { LoaderSpinner } from '@ui/skeletons';

type Props = {
  cartItem: CartItem;
  updatePrice: (id: string, price: number) => void;
};

export const CartItemWidget = ({ cartItem, updatePrice }: Props) => {
  const { items, onButton } = useCartItemWidget({
    cartItem,
    updatePrice,
  });

  const params = getCartWindetParams(items, cartItem.amount);

  return (
    <li>
      <section className={styles['item-container']}>
        <h3 className={params.nameClass}>{params.name}</h3>

        {typeof items === 'string' ? (
          <LoaderSpinner />
        ) : (
          <img src={(items as Product).images[0]} className={styles.image} />
        )}

        <button
          className={styles.clear}
          disabled={params.disableButtons}
          onClick={() => onButton(-Infinity)}
        >
          <CrossIcon />
        </button>
        <div className={styles['buttons-block']}>
          <button
            className={styles.button}
            disabled={params.disableButtons}
            onClick={() => onButton(-1)}
          >
            -
          </button>
          <output className={styles.output}>{cartItem.amount}</output>
          <button
            className={styles.button}
            disabled={params.disableButtons}
            onClick={() => onButton(1)}
          >
            +
          </button>
        </div>
        <span className={styles.price}>{params.price}</span>
      </section>
    </li>
  );
};
