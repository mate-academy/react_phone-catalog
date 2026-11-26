import styles from './EmptyCart.module.scss';
import { assetUrl } from '../../../shared/utils';

export function EmptyCart(): JSX.Element {
  const imageUrl = assetUrl('img/cart-is-empty.png');

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <img src={imageUrl} alt="" className={styles.image} aria-hidden="true" />
      <p className={styles.message}>Your cart is empty</p>
    </div>
  );
}
