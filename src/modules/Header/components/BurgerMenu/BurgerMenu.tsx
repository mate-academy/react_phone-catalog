import { FC } from 'react';
import { NavBar } from '../../../shared/components/NavBar/NavBar';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/logo-black.png';
import close from '../../../../assets/images/icons/close.svg';
import heart from '../../../../assets/images/icons/heart.svg';
import cart from '../../../../assets/images/icons/cart.svg';
import { useFavouriteContext } from '../../../../context/FavoritesContext';
import { useCartContext } from '../../../../context/CartContext';
import s from './BurgerMenu.module.scss';

interface Props {
  onClose: () => void;
}

const getActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${s.active}  ${s.footerLink}` : `${s.footerLink}`;

export const BurgerMenu: FC<Props> = ({ onClose }) => {
  const { count } = useFavouriteContext();
  const { cartCount } = useCartContext();

  return (
    <div className={s.burgerMenu}>
      <div className={s.header}>
        <Link to="/">
          <div className={s.logoWrapper}>
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <div className={s.iconWrapper}>
          <img
            src={close}
            alt="Close Menu"
            onClick={onClose}
            className={s.closeIcon}
          />
        </div>
      </div>
      <div className={s.content}>
        <NavBar variant="vertical" />
      </div>
      <div className={s.footer}>
        <NavLink to="/favorites" className={getActive}>
          <div className={s.iconCountWrapper}>
            {count > 0 && <span className={s.iconCount}>{count}</span>}
            <img src={heart} alt="Favourite" />
          </div>
        </NavLink>
        <NavLink to="/cart" className={getActive}>
          <div className={s.iconCountWrapper}>
            {cartCount > 0 && <span className={s.iconCount}>{cartCount}</span>}
            <img src={cart} alt="Shopping Cart" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
