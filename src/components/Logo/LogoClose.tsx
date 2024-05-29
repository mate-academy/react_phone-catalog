import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/close.svg';
import lightLogo from '../..//image/Light-Theme/close.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const LogoClose = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} {...props} alt="Close" />;
};
