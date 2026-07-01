import { NavLink } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { asset } from '../../utils/paths';
import { useCart } from '../../context/CartContext';

type Props = {
  id: string;
  image: string;
  name: string;
  price: number;
  link: string;
};

export const CartItem: React.FC<Props> = ({ id, image, name, price, link }) => {
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useCart();

  const item = cart.find(i => i.id === id);
  const quantity = item?.quantity ?? 0;

  if (!item) {
    return null;
  }

  return (
    <article className={styles.checkoutProduct}>
      <button
        className={styles.remove}
        onClick={() => removeFromCart(id)}
      ></button>
      <NavLink to={link} className={styles.categoryLink}>
        <img src={asset(image)} alt={name} className={styles.image} />

        <h3 className={styles.name}>{name}</h3>
      </NavLink>
      <div className={styles.counter}>
        <button
          className={`${styles.counter__but} ${styles.counter__butMinus}`}
          onClick={() => decreaseFromCart(id)}
        ></button>

        <span className={styles.counter__num}>{quantity}</span>

        <button
          className={`${styles.counter__but} ${styles.counter__butPlus}`}
          onClick={() => addToCart(id)}
        ></button>
      </div>

      <p className={styles.price}>${price * quantity}</p>
    </article>
  );
};
