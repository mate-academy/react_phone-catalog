import Cross from '@/assets/icons/cross.svg?react';
import Minus from '@/assets/icons/minus.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import { CircleButton } from '@/shared/components/ui';
import { getImageUrl } from '@/shared/utils';

import styles from './CartItem.module.scss';

interface CartProduct {
  id: string;
  image: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

interface Props {
  cartProduct: CartProduct;
}

export const CartItem = ({ cartProduct }: Props) => {
  const { image, name, quantity, totalPrice } = cartProduct;

  return (
    <article className={styles.item}>
      <div className={styles.item__info}>
        <Cross className={styles.cancel} />
        <div className={styles.mainImage}>
          <img src={getImageUrl(image)} alt={`Product img`} draggable={false} />
        </div>
        <h3 className={styles.item_title}>{name}</h3>
      </div>
      <div className={styles.total}>
        <div className={styles.buttons}>
          <CircleButton
            className={styles.buttons__minus}
            aria-label="Minus count"
            disabled={true}
          >
            <Minus />
          </CircleButton>
          <span className={styles.quantity}>{quantity}</span>
          <CircleButton className={styles.buttons__add} aria-label="Add count">
            <Plus />
          </CircleButton>
        </div>
        <span className={styles.price}>{`$${totalPrice}`}</span>
      </div>
    </article>
  );
};
