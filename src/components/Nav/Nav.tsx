import { FunctionComponent } from 'react';

// Styles
import './Nav.scss';

// Components
import { HeaderLink } from '../HeaderLink';

export const Nav: FunctionComponent = () => {
  const navItems = ['Home', 'Phones', 'Tablets', 'Accessories'];

  return (
    <nav className="Nav">
      <ul className="Nav__list">
        {navItems.map(navItem => (
          <li key={navItem} className="Nav__item">
            <HeaderLink item={navItem} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
