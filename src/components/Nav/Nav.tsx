import { navButtons } from './NavButtons';
import { NavButton } from './NavButton';
import './Nav.scss';

export const Nav = () => {
  return (
    <div className="navbar">
      {navButtons.map(button => {
        return (
          <NavButton
            key={button.name}
            name={button.name}
            path={button.path}
          />
        );
      })}
    </div>
  );
};
