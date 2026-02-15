import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { menuModeSlice } from '../../features/menuMode';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  isInMenu?: true;
};

export const Navbar: React.FC<Props> = ({ isInMenu }) => {
  const dispatch = useAppDispatch();

  const handleMenuClose = () => {
    dispatch(menuModeSlice.actions.setIsClose());
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navbar__item, {
      [styles.is_active]: isActive,
    });

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.navbar_menu]: isInMenu,
      })}
    >
      <NavLink to="/" className={getLinkClass} onClick={handleMenuClose}>
        Home
      </NavLink>

      <NavLink to="/phones" className={getLinkClass} onClick={handleMenuClose}>
        Phones
      </NavLink>

      <NavLink to="/tablets" className={getLinkClass} onClick={handleMenuClose}>
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className={getLinkClass}
        onClick={handleMenuClose}
      >
        Accessories
      </NavLink>
    </nav>
  );
};
