// eslint-disable-next-line max-len
import { getTotalItemsCart } from '../../../../components/utils/getTotalItemsCart';
import styles from './Checkout.module.scss';
import { CartItem } from '../../../../features/CartSlice';
type Props = {
  products: CartItem[];
  setModal: (arg: boolean) => void;
};
export const Checkout = ({ products, setModal }: Props) => {
  const totalItems = getTotalItemsCart(products);

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__total}>
          <h2 className={styles.checkout__price}>${totalPrice}</h2>
          <p
            className={styles.checkout__totalCount}
          >{`Total for ${totalItems} items`}</p>
        </div>
        <div className={styles.checkout__border}>
          <div
            className={styles.checkout__button}
            onClick={() => setModal(true)}
          >
            Checkout
          </div>
        </div>
      </div>
    </>
  );
};
