import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/favorites.svg';
import lightLogo from '../../image/Light-Theme/favorites.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconFavorites = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} rel="Logo" {...props} />;
};
