import { NavLink } from 'react-router-dom';

type Props = {
  name: string,
  path: string,
};

export const NavButton:React.FC<Props> = ({
  name,
  path,
}) => {
  return (
    <NavLink
      type="button"
      to={{
        pathname: path,
      }}
      className={({ isActive }) => (`
        navlink
        navbar__navlink
        ${isActive ? 'navlink--selected' : undefined}
      `)}
    >
      {name}
    </NavLink>
  );
};
