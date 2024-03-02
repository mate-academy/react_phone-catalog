import { NavLink } from 'react-router-dom';
import './MenuPage.scss';

export const MenuPage = () => {
  return (
    <div className="container">
      <div className="page-menu">
        <ul className="page-menu__list">
          <li className="page-menu__item">
            <NavLink className="page-menu__link" to="/">
              home
            </NavLink>
          </li>
          <li className="page-menu__item">
            <NavLink
              className="page-menu__link"
              to="/phones"
            >
              phones
            </NavLink>
          </li>
          <li className="page-menu__item">
            <NavLink className="page-menu__link" to="/tablets">
              tablets
            </NavLink>
          </li>
          <li className="page-menu__item">
            <NavLink className="page-menu__link" to="/accessories">
              accessories
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
