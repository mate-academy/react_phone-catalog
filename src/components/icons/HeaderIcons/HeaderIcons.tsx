import { NavLink } from 'react-router-dom';
import styles from './HeaderIcons.module.scss';

type Props = {
  className: string;
  classIcon: string;
};

export const HeaderIcons = ({ className, classIcon }: Props) => {
  return (
    <div className={className || ''}>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `${classIcon || ''} ${isActive ? styles.active : ''}`
        }
      >
        <img src="/img/header/Favourites.svg" alt="Nice Gadgets" />
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${classIcon || ''} ${isActive ? styles.active : ''}`
        }
      >
        <img src="/img/header/Cart.svg" alt="Nice Gadgets" />
      </NavLink>
    </div>
  );
};
