import { navButtons } from './navButtons';
import { NavButton } from './NavButton';

export const Nav = () => {
  return (
    <nav className="Nav">
      {navButtons.map(button => (
        <NavButton key={button.path} name={button.name} path={button.path} />
      ))}
    </nav>
  );
};
