import { Link } from 'react-router-dom';

import { useLanguage } from '../../../../context/LanguageContext';
import { Product } from '../../../../types/Product';
import { getPublicPath } from '../../../../utils/getPublicPath';
import styles from './CartItemCard.module.scss';

interface Props {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onChangeQuantity: (quantity: number) => void;
}

export const CartItemCard: React.FC<Props> = ({
  product,
  quantity,
  onRemove,
  onChangeQuantity,
}) => {
  const { t } = useLanguage();

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        aria-label={t('cart.remove', { name: product.name })}
        onClick={onRemove}
      >
        <img
          src={getPublicPath('img/close.svg')}
          alt=""
          aria-hidden="true"
          className={styles.removeIcon}
        />
      </button>

      <Link
        to={`/product/${product.itemId}`}
        state={{ category: product.category }}
        className={styles.imageLink}
      >
        <img
          src={getPublicPath(product.image)}
          alt={product.name}
          className={styles.productImage}
        />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        state={{ category: product.category }}
        className={styles.title}
      >
        {product.name}
      </Link>

      <div className={styles.quantity} aria-label={t('cart.quantity')}>
        <button
          type="button"
          aria-label={t('cart.decrease')}
          disabled={quantity === 1}
          onClick={() => onChangeQuantity(quantity - 1)}
        >
          <span className={styles.minusIcon} aria-hidden="true" />
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          aria-label={t('cart.increase')}
          onClick={() => onChangeQuantity(quantity + 1)}
        >
          <span className={styles.plusIcon} aria-hidden="true" />
        </button>
      </div>

      <p className={styles.price}>${product.price * quantity}</p>
    </article>
  );
};
