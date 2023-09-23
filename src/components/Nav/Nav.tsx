import { NavButton } from './NavButton';
import { navButtons } from './navButtons';

import './Nav.scss';

export const Nav = () => (
  <nav className="Nav">
    {navButtons.map(button => (
      <NavButton
        key={button.path}
        name={button.name}
        path={button.path}
      />
    ))}
  </nav>
);
