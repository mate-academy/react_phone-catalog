import { NavLink } from 'react-router-dom';
import { pageData } from '../../data/pageData';
import { linkClass } from '../../helpers/linkClass';

export const Navigation = () => {
  const navData = pageData.filter(page => page.isNav);

  return (
    <nav className="nav">
      <ul className="nav__items">
        {navData.map(category => (
          <li className="nav__item" key={category.link}>
            <NavLink className={linkClass.nav} to={category.link}>
              {category.navName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
