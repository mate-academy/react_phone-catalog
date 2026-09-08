import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './IconLink.module.scss';
import {
  BurgerMenu,
  CartIcon,
  Close,
  Favourites,
} from '../../_constants/icons';

type Props = {
  modificator: string;
  count?: number;
  onClick?: () => void;
};

export const IconLink: React.FC<Props> = ({
  modificator,
  count = 0,
  onClick = () => {},
}) => {
  const isNavigate = modificator !== 'close' && modificator !== 'menu';

  return (
    <>
      <NavLink
        onClick={onClick}
        className={({ isActive }) =>
          classNames(`${styles.icon} ${styles[`icon--${modificator}`]}`, {
            [styles['icon--active']]: isActive && isNavigate,
          })
        }
        to={isNavigate ? `${modificator}` : '#'}
      >
        {modificator === 'close' && <Close />}
        {modificator === 'menu' && <BurgerMenu />}
        {modificator === 'cart' && <CartIcon />}
        {modificator === 'favourites' && <Favourites />}
        {!!count && <div className={styles.icon__counter}>{count}</div>}
      </NavLink>
    </>
  );
};
