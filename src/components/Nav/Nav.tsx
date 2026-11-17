import { NavLink } from 'react-router-dom';
import './Nav.scss';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={'/'}
            end
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={'/phones'}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            phone
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={'/tablets'}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            to={'/accessories'}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
