import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink to="/">
      <img
        src="/src/shared/icons/logo.svg"
        alt=""
        aria-hidden="true"
        style={{ width: '100%', height: '100%' }}
      />
    </NavLink>
  );
};
