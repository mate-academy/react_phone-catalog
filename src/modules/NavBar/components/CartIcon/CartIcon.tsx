import style from './CartIcon.module.scss';
import { useSelector } from 'react-redux';
import { selectToCart } from '../../../../state/cartSlice';
import cartIcon from '../../../../assets/CartIcon.svg';

export const CartIcon = () => {
  const cartState = useSelector(selectToCart);

  return (
    <div className={style.cartIcon}>
      <div className={style.iconWrapper}>
        <img className={style.icon} src={cartIcon} alt="Cart" />
        {cartState.length > 0 && (
          <span className={style.counter}>{cartState.length}</span>
        )}
      </div>
    </div>
  );
};
