import './Menu.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getStylelink = ({ isActive }: { isActive: boolean }) => {
  return classNames('menu__link', {
    menu__active: isActive,
  });
};

const getStylelinkActions = ({ isActive }: { isActive: boolean }) => {
  return classNames('menu__actions__link', {
    actions__active: isActive,
  });
};

export const Menu: React.FC = () => {
  return (
    <div className="menu">
      <nav className="menu__nav">
        <NavLink to="/" className={getStylelink}>
          Home
        </NavLink>
        <NavLink to="/Phones" className={getStylelink}>
          Phones
        </NavLink>
        <NavLink to="/Tablets" className={getStylelink}>
          Tablets
        </NavLink>
        <NavLink to="/Acsessories" className={getStylelink}>
          Acsessories
        </NavLink>
      </nav>

      <div className="menu__actions">
        <NavLink to="favorites" className={getStylelinkActions}>
          <div className="icon icon--favorites"></div>
        </NavLink>

        <NavLink to="cart" className={getStylelinkActions}>
          <div className="icon icon--cart"></div>
        </NavLink>
      </div>
    </div>
  );
};
