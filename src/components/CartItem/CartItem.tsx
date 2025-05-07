import styles from './CartItem.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartProduct } from '../../types/CartProduct';
import { cartSlice } from '../../features/cartSlice';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__top}>
        <button
          className={`${styles.cartItem__close} ${stylesIcon.icon} ${stylesIcon.icon__close__grey}`}
          onClick={() => dispatch(cartSlice.actions.removeGood(item))}
        ></button>
        <div className={styles.cartItem__imgBox}>
          <img
            className={styles.cartItem__img}
            src={`${item.images[0]}`}
            alt={`img ${item.name}`}
          />
        </div>
        <p className={styles.cartItem__title}>{item.name}</p>
      </div>
      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__counter}>
          <button
            className={`${styles.cartItem__counter__button__minus} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__minus__dark : stylesIcon.icon__minus} ${stylesBtn.button}`}
            onClick={() =>
              dispatch(
                cartSlice.actions.updateGood({
                  ...item,
                  quantity: item.quantity - 1,
                }),
              )
            }
            disabled={item.quantity === 1}
          ></button>
          <p className={styles.cartItem__counter__value}>{item?.quantity}</p>
          <button
            className={`${styles.cartItem__counter__button__plus} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__plus__dark : stylesIcon.icon__plus} ${stylesBtn.button}`}
            onClick={() =>
              dispatch(
                cartSlice.actions.updateGood({
                  ...item,
                  quantity: item.quantity + 1,
                }),
              )
            }
          ></button>
        </div>
        <h3
          className={styles.cartItem__price}
        >{`$${item.priceDiscount * item?.quantity}`}</h3>
      </div>
    </div>
  );
};
