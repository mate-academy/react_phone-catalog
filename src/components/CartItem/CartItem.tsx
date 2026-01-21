import classNames from 'classnames';
import { CartProduct } from '../../types/Product';
import styles from './CartItem.module.scss';
import { useCart } from '../../utils/hooks/Context/useCart';
import { getRouteByCategory } from '../../services/product';
import { Link } from 'react-router-dom';

type Props = {
  product: CartProduct;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const classButtonIncrease =
    product.count === 1 ? 'button--disabled' : 'button--icon';

  const classIconDecrease =
    product.count === 1 ? 'icon--minus-disabled' : 'icon--minus-active';

  const { increaseCount, decreaseCount, removeFromCart } = useCart();

  return (
    <article className={styles.cartItem}>
      <button onClick={() => removeFromCart(product.id)} className="button">
        <span className="icon icon--close-light" />
      </button>

      <Link
        to={`${getRouteByCategory(product.category)}/${product.itemId}`}
        className={styles['cartItem__image-wrapper']}
      >
        <img
          className={styles.cartItem__image}
          src={product.image}
          alt={product.name}
        />
      </Link>

      <p className={styles.cartItem__name}>{product.name}</p>

      <div className={styles.cartItem__qty}>
        <button
          className={classNames('button button--small', classButtonIncrease)}
          onClick={() => decreaseCount(product.id)}
        >
          <span className={classNames('icon', classIconDecrease)} />
        </button>
        <p className={styles.cartItem__totalPrice}>{product.count}</p>
        <button
          className="button button--icon button--small"
          onClick={() => increaseCount(product.id)}
        >
          <span className="icon icon--plus-active" />
        </button>
      </div>

      <h3 className={styles.cartItem__price}>
        ${product.price * product.count}
      </h3>
    </article>
  );
};
