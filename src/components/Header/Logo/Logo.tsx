import { useContext } from 'react';
import darkLogo from '../../../image/DarkTheme/logo.svg';
import lightLogo from '../../../image/Light-Theme/logo/logo.svg';
import { ThemeContext } from '../../../store/ThemeProvider';

export const Logo = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme === 'light-theme' ? lightLogo : darkLogo;

  return (
    <a href="#">
      <img src={logo} rel="Logo" {...props} />
    </a>
  );
};
