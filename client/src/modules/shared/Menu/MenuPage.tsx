import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return cn('menu__link', {
    'selected-link': isActive,
  });
};

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return cn('menu__icon', {
    'selected-tab': isActive,
  });
};

export const MenuPage = () => {
  const { favorites, cart } = useAppSelector(state => state.products);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <nav className="menu">
      <ul className="menu__links">
        <NavLink to="/" className={getActiveLink}>
          Home
        </NavLink>

        <NavLink to="/phones" className={getActiveLink}>
          Phones
        </NavLink>

        <NavLink to="/tablets" className={getActiveLink}>
          Tablets
        </NavLink>

        <NavLink to="/accessories" className={getActiveLink}>
          Accessories
        </NavLink>
      </ul>

      <div className="menu__icons">
        <NavLink to="/favorites" className={getActiveTab}>
          <div className="nav-bar__favorite icon">
            {!!favorites?.length && (
              <div className="nav-bar__icon-text">{favorites?.length}</div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getActiveTab}>
          <div className="nav-bar__cart icon">
            {!!cart?.length && (
              <div className="nav-bar__icon-text">{cart?.length}</div>
            )}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
