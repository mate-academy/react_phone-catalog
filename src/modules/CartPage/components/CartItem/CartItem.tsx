import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CartItem as CartLine } from '@shared/types';
import { useTranslation } from '@shared/context';
import { closeIcon } from '@shared/assets/icons';
import styles from './CartItem.module.scss';

interface Props {
  item: CartLine;
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const { t } = useTranslation();
  const { id, quantity, product } = item;
  const { name, image, price } = product;

  return (
    <article className={styles.item}>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.remove}
          aria-label={t('cart.remove', { name })}
          onClick={() => onRemove(id)}
        >
          <img src={closeIcon} alt="" className="icon" />
        </button>

        <Link to={`/product/${id}`} className={styles.photoLink}>
          <img src={image} alt={name} className={styles.photo} />
        </Link>

        <Link to={`/product/${id}`} className={styles.title}>
          {name}
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label={t('cart.decrease')}
            disabled={quantity === 1}
            onClick={() => onQuantityChange(id, quantity - 1)}
          />

          <span className={styles.count}>{quantity}</span>

          <button
            type="button"
            className={cn(styles.quantityButton, styles.plus)}
            aria-label={t('cart.increase')}
            onClick={() => onQuantityChange(id, quantity + 1)}
          />
        </div>

        <p className={styles.price}>{`$${price * quantity}`}</p>
      </div>
    </article>
  );
};
