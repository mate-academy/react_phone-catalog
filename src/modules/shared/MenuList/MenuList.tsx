import { NavLink } from 'react-router-dom';
import './MenuList.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../Context/Context';

export const MenuList = () => {
  const { path } = useContext(ProductContext);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (path !== '/menu') {
      return classNames('navigation__link--header', {
        'is-active': isActive,
      });
    }

    return 'navigation__link--menu';
  };

  return (
    <ul
      className={classNames('navigation__list', {
        'navigation__list--menu': path === '/menu',
        'navigation__list--header': path !== '/menu',
      })}
    >
      <li>
        <NavLink className={getLinkClass} to="/">
          home
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/phones">
          Phones
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/tablets">
          tablets
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/accessories">
          accessories
        </NavLink>
      </li>
    </ul>
  );
};
