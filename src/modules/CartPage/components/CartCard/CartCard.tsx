import { Link } from 'react-router-dom';
import { useAppContext } from '../../../../context/AppContext';
import { Product } from '../../../../types/Product';
import styles from './CartCard.module.scss';

type Props = {
  cartItem: Product;
};

export const CartCard = ({ cartItem }: Props) => {
  const { cartIds, setCartIds } = useAppContext();

  const increaseTheCounter = (id: number) => {
    setCartIds(prev => [...prev, id]);
  };

  const decreaseTheCounter = (targetId: number) => {
    setCartIds(prev => {
      const idIndex = prev.findIndex(id => id === targetId);

      return [...prev.slice(0, idIndex), ...prev.slice(idIndex + 1)];
    });
  };

  const deleteItem = (targetId: number) => {
    setCartIds(prev => prev.filter(id => id !== targetId));
  };

  const countItemLength = () => {
    return cartIds.filter(itemId => itemId === cartItem.id).length;
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <img
          onClick={() => deleteItem(cartItem.id)}
          className={styles.cardClose}
          src="icons/close.svg"
          alt="close"
        />
        <Link
          to={`product/${cartItem.category}/${cartItem.id}`}
          className={styles.imgContainer}
        >
          <img
            className={styles.cardImg}
            src={cartItem.image}
            alt={cartItem.name}
          />
        </Link>
        <Link
          to={`product/${cartItem.category}/${cartItem.id}`}
          className={styles.cardTitleLink}
        >
          <p className={styles.cardTitle}>{cartItem.name}</p>
        </Link>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.buttons}>
          <button
            disabled={countItemLength() === 1}
            onClick={() => decreaseTheCounter(cartItem.id)}
            className={styles.btn}
          >
            <img src="icons/minus.svg" alt="minus" />
          </button>
          {countItemLength()}
          <button
            onClick={() => increaseTheCounter(cartItem.id)}
            className={styles.btn}
          >
            <img src="icons/plus.svg" alt="plus" />
          </button>
        </div>
        <h3 className={styles.price}>${cartItem.price}</h3>
      </div>
    </div>
  );
};
