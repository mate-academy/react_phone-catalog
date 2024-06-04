import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/logo.svg';
import lightLogo from '../../image/Light-Theme/logo.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const Logo = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} rel="Logo" {...props} />;
};
