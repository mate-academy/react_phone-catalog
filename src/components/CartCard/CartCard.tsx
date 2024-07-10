import { Link } from 'react-router-dom';
import styles from './CartCard.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Product } from '../../types/Product';

type Props = {
  category: string;
  itemId: string;
  image: string;
  name: string;
  item: Product;
};

export const CartCard = ({
  category,
  itemId,
  image,
  name,
  item,
}: Props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { bascket } = state;

  const handleDeleteAllItems = () => {
    dispatch({
      type: 'removeAllFromBascket',
      payload: item,
    });
  };

  const deleteOneItem = () => {
    dispatch({
      type: 'deleteOneItem',
      payload: { itemId: item.itemId, quantity: 1 },
    });
  };

  const addOneItem = () => {
    dispatch({
      type: 'addOneItem',
      payload: { itemId: item.itemId, quantity: 1 },
    });
  };

  const index = state.bascket.findIndex(el => el.itemId === itemId);

  return (
    <div className={styles.container}>
      <div className={styles.firstBlock}>
        <img
          src="img/close_light.svg"
          alt="close"
          className={styles.close}
          onClick={handleDeleteAllItems}
        />
        <Link to={`/${category}/${itemId}`} className={styles.image}>
          <img src={`${image}`} alt="img" className={styles.img} />
        </Link>
        <Link to={`/${category}/${itemId}`}>
          <h3 className={styles.name}>{name}</h3>
        </Link>
      </div>

      <div className={styles.secondBlock}>
        <div className={styles.buttonBlock}>
          <button className={styles.minus} onClick={deleteOneItem}>
            <img src="img/Minus.svg" alt="minus" />
          </button>
          <p className={styles.quantity}>{bascket[index].quantity}</p>
          <button className={styles.minus} onClick={addOneItem}>
            <img src="img/Plus.svg" alt="plus" />
          </button>
        </div>
        <p className={styles.price}>{`$${bascket[index].quantity * bascket[index].price}`}</p>
      </div>
    </div>
  );
};
