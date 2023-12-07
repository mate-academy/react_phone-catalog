import { useMatch, NavLink } from 'react-router-dom';

import './NavBar.scss';

import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn({
    'is-active': isActive,
  });
};

export const NavBar = () => {
  const match = useMatch('/fuck');

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__link">
          <NavLink to="/" className={getLinkClass({ isActive: !!match })}>
            Home
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink to="/fuck" className={getLinkClass({ isActive: !!match })}>
            Phones
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink to="/">Tablets</NavLink>
        </li>
        <li className="nav__link">
          <NavLink to="/">Accessories</NavLink>
        </li>
      </ul>
    </nav>
  );
};
