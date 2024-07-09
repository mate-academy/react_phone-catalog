import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/burger-menu.svg';
import lightLogo from '../../image/Light-Theme/burger-menu.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconBurger = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} rel="Logo" {...props} />;
};
