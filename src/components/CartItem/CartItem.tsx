import styles from './CartItem.module.scss';
import { asset } from '../../utils/paths';
import { useCart } from '../../context/CartContext';

type Props = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export const CartItem: React.FC<Props> = ({ id, image, name, price }) => {
  const { cart, addToCart, decreaseFromCart } = useCart();

  const item = cart.find(i => i.id === id);
  const quantity = item?.quantity ?? 1;

  return (
    <article className={styles.checkoutProduct}>
      <button className={styles.remove}></button>

      <img src={asset(image)} alt={name} className={styles.image} />

      <h3 className={styles.name}>{name}</h3>

      <div className={styles.counter}>
        <button onClick={() => decreaseFromCart(id)}>-</button>

        <span>{quantity}</span>

        <button onClick={() => addToCart(id)}>+</button>
      </div>

      <p className={styles.price}>${price * quantity}</p>
    </article>
  );
};
