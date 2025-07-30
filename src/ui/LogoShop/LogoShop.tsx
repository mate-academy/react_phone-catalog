import { NavLink } from 'react-router-dom';
import { useThemeState } from '../../stateManagers/themeState';
import logoLight from '../../images/logo.svg';
import logoDark from '../../images/Logo-dark.svg';

export const LogoShop = () => {
  const { theme } = useThemeState();

  return (
    <NavLink
      to="/"
      className="logo"
    >
      <img
        src={theme === 'light' ? logoLight : logoDark}
        alt="Shop logo"
      />
    </NavLink>
  );
};
