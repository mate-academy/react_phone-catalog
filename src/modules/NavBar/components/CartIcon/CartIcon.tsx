import style from './CartIcon.module.scss';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../../../state/cartSlice';

export const CartIcon = () => {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <div className={style.cartIcon}>
      <div className={style.iconWrapper}>
        <img className={style.icon} src="Icons/cart.png" alt="Cart" />
        {totalQuantity > 0 && (
          <span className={style.counter}>{totalQuantity}</span>
        )}
      </div>
    </div>
  );
};
