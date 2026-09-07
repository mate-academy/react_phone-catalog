import { Button } from '../../../../components/Button/Button';
import { ProductFull } from '../../../../types/Product_full';
import styles from './CartList.module.scss';

type Props = {
  handleDecrement: (itemId: string) => void;
  handleIncrement: (itemId: string) => void;
  handleDelete: (itemId: string) => void;
  cart: ProductFull[];
};

export const CartList: React.FC<Props> = ({
  handleDecrement,
  handleIncrement,
  handleDelete,
  cart,
}) => {
  return (
    <ul className={styles.cartList}>
      {cart.map(product => (
        <li key={product.id} className={styles.cartList__item}>
          <article className={styles.cartItem}>
            <div className={styles.cartItem__top}>
              <Button
                textContent=""
                className={['button', 'delete']}
                onClick={() => handleDelete(product.id)}
              />
              <div className={styles.cartItem__imgWrapper}>
                <img
                  src={product.images[0]}
                  alt="product image front and back"
                  className={styles.cartItem__img}
                />
              </div>
              <p className={styles.cartItem__name}>{product.name}</p>
            </div>
            <div className={styles.cartItem__bottom}>
              <div className={styles.cartItem__buttons}>
                <Button
                  textContent=""
                  className={
                    [
                      'button',
                      'decrement',
                      product.quantity === 1 && 'decrement--disabled',
                    ].filter(Boolean) as string[]
                  }
                  onClick={() => handleDecrement(product.id)}
                />

                <p className={styles.cartItem__quantity}>{product.quantity}</p>

                <Button
                  textContent=""
                  className={['button', 'increment']}
                  onClick={() => handleIncrement(product.id)}
                />
              </div>
              <h3 className={styles.cartItem__price}>
                ${product.priceDiscount}
              </h3>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};
