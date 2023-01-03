import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink
      to="/"
      className="logo"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <img
        className="logo__img"
        src="/img/logo.png"
        alt="logo"
      />
    </NavLink>
  );
};
