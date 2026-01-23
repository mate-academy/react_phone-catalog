import styles from './CartItem.module.scss';
import { useCart } from '../../shared/hooks/useCart';
import classNames from 'classnames';
import { CartItem as Item } from '../../shared/store/cart/cart.types';
import { asset } from '../../shared/utils/asset';

type Props = {
  item: Item;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { remove, changeQty } = useCart();

  return (
    <div key={item.product.id} className={styles.product}>
      <a className={styles.closeLink} onClick={() => remove(item.product.id)}>
        <img
          src={asset('/img/icons/close.png')}
          className={styles.icon}
          alt="Close icon"
        ></img>
      </a>

      <div className={styles.productImgBlock}>
        <img
          src={asset('/' + item.product.image)}
          className={styles.productImg}
        ></img>
      </div>
      <p className={styles.productName}> {item.product.name}</p>

      <div className={styles.nav}>
        <a
          className={classNames(styles.navLink, {
            [styles.disabled]: item.quantity === 1,
          })}
          onClick={() =>
            item.quantity !== 1 && changeQty(item.product.id, item.quantity - 1)
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <span className={styles.quantity}> {item.quantity}</span>
        <a
          className={styles.navLink}
          onClick={() => changeQty(item.product.id, item.quantity + 1)}
        >
          {' '}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M8.66602 3.33335C8.66602 2.96516 8.36754 2.66669 7.99935 2.66669C7.63116 2.66669 7.33268 2.96516 7.33268 3.33335V7.33335H3.33268C2.96449 7.33335 2.66602 7.63183 2.66602 8.00002C2.66602 8.36821 2.96449 8.66669 3.33268 8.66669H7.33268V12.6667C7.33268 13.0349 7.63116 13.3334 7.99935 13.3334C8.36754 13.3334 8.66602 13.0349 8.66602 12.6667V8.66669H12.666C13.0342 8.66669 13.3327 8.36821 13.3327 8.00002C13.3327 7.63183 13.0342 7.33335 12.666 7.33335H8.66602V3.33335Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <div className={styles.price}>${item.product.price}</div>
    </div>
  );
};
