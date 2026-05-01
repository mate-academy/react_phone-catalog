import { NavLink } from 'react-router-dom';
import styles from './Icons.module.scss';
import { useContext } from 'react';
import { FavContext } from '../../contexts/favorites';
import { CartContext } from '../../contexts/cart';
import { getClassLink } from '../../utils/getClassLink';
import cart from '../../images/Icons/Cart.svg';
import heart from '../../images/Icons/Heart.svg';

export const Icons: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavContext);

  const getLinkClass = getClassLink({
    baseClass: styles.icons__iconLink,
    activeClass: styles.activeLink,
  });

  return (
    <div className={styles.icons}>
      <div className={styles.icons__iconBlock}>
        <NavLink className={getLinkClass} to="/favorites">
          {!!favorites.length && (
            <div className={styles.icons__iconCounter}>{favorites.length}</div>
          )}
          <img className={styles.icons__heartImg} src={heart} />
        </NavLink>
      </div>
      <div className={styles.icons__iconBlockLeft}>
        <NavLink className={getLinkClass} to="/cart">
          {!!cartItems.length && (
            <div className={styles.icons__iconCounter}>{cartItems.length}</div>
          )}
          <img className={styles.icons__cartImg} src={cart} />
        </NavLink>
      </div>
    </div>
  );
};
