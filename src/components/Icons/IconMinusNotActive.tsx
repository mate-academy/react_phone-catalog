import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/not-active-minus.svg';
import lightLogo from '../../image/Light-Theme/not-active-minus.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconNotActiveMinus = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);
  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} rel="Minus logo" {...props} />;
};
