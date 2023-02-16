import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  const navLinksList = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <ul
      className="header__burger-list"
      // style={{ display: isBurgerVisible ? 'flex' : 'none' }}
    >
      {
        navLinksList.map((item: string) => {
          return (
            <li
              key={item}
              className="header__burger-item"
            >
              <NavLink
                to={item}
                className={({ isActive }) => (
                  isActive ? 'active__burger-link' : 'header__burger-link'
                )}
              >
                {item}
              </NavLink>
            </li>
          );
        })
      }

    </ul>
  );
};
