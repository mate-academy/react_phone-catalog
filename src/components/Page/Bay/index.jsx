import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromBay,
} from '../../../redux/slices/baySlice';
import styles from './bay.module.scss';

export default function Bay() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const bay = useSelector(state => state.bay.bayList);
  const bayProducts = products.filter(product =>
    bay.some(item => item.id === product.id),
  );

  const handleRemove = id => {
    dispatch(removeFromBay(id));
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  const totalSum = bayProducts.reduce((sum, product) => {
    const bayItem = bay.find(item => item.id === product.id);
    return sum + product.price * bayItem.quantity;
  }, 0);

  const totalCount = bay.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className={styles.root}>
      {bay.length > 0 ? (
        <div className={styles.main}>
          <h2>Cart</h2>
          <div className={styles.block}>
            <ul className={styles.phonesList}>
              {bayProducts.map(product => {
                const bayItem = bay.find(item => item.id === product.id);
                return (
                  <li className={styles.phonesList__cart} key={product.id}>
                    <div className={styles.topSections}>
                      <div
                        className={styles.phonesList__cart__close}
                        onClick={() => handleRemove(product.id)}
                      >
                        <IoMdClose
                          className={styles.phonesList__cart__close__svg}
                          size={20}
                        />
                      </div>
                      <div>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className={styles.phonesList__cart__name}>
                        <p>{product.name}</p>
                      </div>
                    </div>
                    <div className={styles.sections}>
                      <div className={styles.phonesList__cart__buttons}>
                        <button onClick={() => handleDecrement(product.id)}>
                          -
                        </button>
                        <p>{bayItem.quantity}</p>
                        <button onClick={() => handleIncrement(product.id)}>
                          +
                        </button>
                      </div>
                      <div className={styles.phonesList__cart__price}>
                        <strong>${product.price * bayItem.quantity}</strong>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.sum}>
              <h2>${totalSum.toFixed(2)}</h2>
              <p>Total for {totalCount} items</p>
              <div className={styles.line}></div>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <h2 className={styles.error}>
          You do not have any bay products yet 🥲
        </h2>
      )}
    </div>
  );
}
