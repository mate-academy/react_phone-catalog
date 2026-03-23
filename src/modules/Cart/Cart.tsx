import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../hooks/useCart';
import {
  changeProductQuantity,
  deleteProductFromCart,
} from '../../store/cart/CartReducer';
import { imageUrl } from '../../utils/imageUrl';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs title="Cart" />

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <img
            src={imageUrl('img/cart-is-empty.png')}
            alt=""
            className={styles.empty__img}
          />
          <h2 className={styles.empty__title}>Your cart is empty!</h2>
          <p className={styles.empty__subtitle}>Lets buy something</p>
          <Button onClick={() => navigate('/catalog')}>Catalog</Button>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.sidebar}>
            <div className={styles.sidebar__header}>
              <h3 className={styles.sidebar__price}>{`$${getTotalPrice()}`}</h3>
              <p className={styles.sidebar__subtitle}>
                Total for {cart.length} items
              </p>
            </div>
            <Button maxWidth={'100%'} onClick={() => {}}>
              Checkout
            </Button>
          </div>
          <div className={styles.content}>
            {cart.map(item => {
              return (
                <div key={item.id} className={styles.product}>
                  <button
                    type="button"
                    onClick={() => setCart(deleteProductFromCart(item.id))}
                    className={styles.delete}
                  ></button>
                  <div className={styles.img}>
                    <img
                      src={imageUrl(item.product.image)}
                      alt=""
                      className={styles.img__photo}
                    />
                  </div>
                  <div className={styles.group}>
                    <h2 className={styles.name}>{item.product.name}</h2>
                    <div className={styles.count}>
                      <button
                        type="button"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          setCart(changeProductQuantity(item.id, -1))
                        }
                        className={classNames(styles.count__btn, {
                          [styles.count__btn_disabled]: item.quantity === 1,
                        })}
                      >
                        -
                      </button>
                      <span className={styles.count__amount}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={item.quantity === 99}
                        onClick={() =>
                          setCart(changeProductQuantity(item.id, 1))
                        }
                        className={classNames(styles.count__btn, {
                          [styles.count__btn_disabled]: item.quantity === 99,
                        })}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.price}>
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
