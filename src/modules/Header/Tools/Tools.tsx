import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import heart from './../../../images/icons/favorite.svg';
import shop from './../../../images/icons/shop.svg';
import styles from './Tools.module.scss';
import { getTotalAmountOfItems } from '../../../helpers/helpers';

export const Tools = () => {
  const favoritesItems = useAppSelector(state => state.favorites);

  const cartItems = useAppSelector(state => state.cart.items);

  const amountOfProducts = getTotalAmountOfItems(cartItems);

  return (
    <div className={styles.header__tools_wrapper}>
      <button className={styles.header__tools__button}>
        <img src={heart} alt="Heart" />
        <span>{favoritesItems.length}</span>
      </button>
      <Link to="/cart" className={styles.header__tools__button}>
        <img src={shop} alt="Shop" />
        <span>{amountOfProducts}</span>
      </Link>
    </div>
  );
};
