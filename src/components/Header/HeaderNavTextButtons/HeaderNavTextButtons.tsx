import { NavLink } from 'react-router-dom';

type Props = {
  navLinksList: string[],
};

export const HeaderNavTextButtons: React.FC<Props> = ({ navLinksList }) => {
  return (
    <ul
      className="header__navigation-list"
      id="hidden"
    >
      {
        navLinksList.map((item: string) => {
          return (
            <li
              key={item}
              className="header__navigation-item"
              id="header__navigation-item"
            >
              <NavLink
                to={item}
                className={({ isActive }) => (
                  isActive ? 'active' : 'header__navigation-link'
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
