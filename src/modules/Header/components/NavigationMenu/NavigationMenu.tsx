import styles from './NavigationMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  onClose?: () => void;
};

export const NavigationMenu: React.FC<Props> = ({ onClose = () => {} }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigation__navItem, 'text-uppercase', {
      [styles.navigation__isActive]: isActive,
    });

  return (
    <>
      <NavLink to="/" className={getLinkClass} onClick={onClose}>
        Home
      </NavLink>
      <NavLink to="phones" className={getLinkClass} onClick={onClose}>
        Phones
      </NavLink>
      <NavLink to="tablets" className={getLinkClass} onClick={onClose}>
        Tablets
      </NavLink>
      <NavLink to="accessories" className={getLinkClass} onClick={onClose}>
        Accessories
      </NavLink>
    </>
  );
};
