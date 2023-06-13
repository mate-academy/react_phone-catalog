import { NavLink } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <NavLink to="home">
      <img
        src="_new/img/icons/logo.svg"
        alt="logo"
      />
    </NavLink>
  );
};
