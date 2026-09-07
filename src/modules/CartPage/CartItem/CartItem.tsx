import styles from './CartItem.module.scss';
import { Product } from '../../../types/Product';
import closeIcon from '../../../assets/icons/close.svg';
import plusIcon from '../../../assets/icons/plus-icon.svg';
import minusIcon from '../../../assets/icons/minus-icon.svg';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(DataContext);

  const decreaseAmount = () => {
    setCart(
      cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      }),
    );
  };

  const increaseAmount = () => {
    setCart(
      cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }),
    );
  };

  return (
    <li key={product.id} className={styles.cartItem}>
      <div className={styles.cartItem__top}>
        <button
          className={styles.cartItem__remove}
          onClick={() => {
            setCart(cart.filter(item => item.id !== product.id));
          }}
        >
          <img src={closeIcon} alt="" />
        </button>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            src={product.image}
            alt="product"
            className={styles.cartItem__img}
          />
        </Link>
        <Link to={`/${product.category}/${product.itemId}`}>
          <p className={styles.cartItem__title}>{product.name}</p>
        </Link>
      </div>
      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__amountWrapper}>
          <button
            onClick={decreaseAmount}
            disabled={product.quantity <= 1}
            className={styles.cartItem__minus}
          >
            <img src={minusIcon} alt="" />
          </button>
          <p className={classNames(styles.cartItem__amount, 'body-text')}>
            {product.quantity}
          </p>
          <button onClick={increaseAmount} className={styles.cartItem__plus}>
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <h3 className={styles.cartItem__price}>
          ${product.price * product.quantity}
        </h3>
      </div>
    </li>
  );
};
