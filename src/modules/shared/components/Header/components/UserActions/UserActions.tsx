import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './UserActions.module.scss';
import { useMenu } from '../Menu/MenuContext';
import { closeMenuOnClick } from 'modules/shared/helpers/handlers';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon, {
    [styles.linkActive]: isActive,
  });

export const UserActions = () => {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <div
      className={classNames(styles.userActions, {
        [styles.menuOpen]: isMenuOpen,
      })}
    >
      <NavLink
        to="/favourites"
        className={getLinkClass}
        onClick={() => closeMenuOnClick(isMenuOpen, toggleMenu)}
      >
        <img
          className={styles.image}
          src="img/icons/heart.svg"
          alt="Favourites"
        />
      </NavLink>

      <NavLink
        to="/cart"
        className={getLinkClass}
        onClick={() => closeMenuOnClick(isMenuOpen, toggleMenu)}
      >
        <img className={styles.image} src="img/icons/cart.svg" alt="Cart" />
      </NavLink>
    </div>
  );
};
