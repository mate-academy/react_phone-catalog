import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import heart from './../../../images/icons/favorite.svg';
import shop from './../../../images/icons/shop.svg';
import styles from './Tools.module.scss';

export const Tools = () => {
  const favoritesItems = useAppSelector(state => state.favorites);

  const cartItems = useAppSelector(state => state.cart.items);

  return (
    <div className={styles.header__tools_wrapper}>
      <button className={styles.header__tools__button}>
        <img src={heart} alt="Heart" />
        <span>{favoritesItems.length}</span>
      </button>
      <Link to="/cart" className={styles.header__tools__button}>
        <img src={shop} alt="Shop" />
        <span>{cartItems.length}</span>
      </Link>
    </div>
  );
};
