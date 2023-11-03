import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className="nav-list__link"
    >
      {text}
    </NavLink>
  );
};
