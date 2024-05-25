import { useContext } from 'react';
import darkLogo from '../../../image/DarkTheme/favorites.svg';
import lightLogo from '../../../image/Light-Theme/logo/favorites.svg';
import { ThemeContext } from '../../../store/ThemeProvider';

export const LogoFavorites = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme === 'light-theme' ? lightLogo : darkLogo;

  return <img src={logo} rel="Logo" {...props} />;
};
