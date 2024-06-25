import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';
import darkTheme from '../../image/DarkTheme/home-icon.svg';
import lightTheme from '../../image/Light-Theme/home-icon.svg';

export const IconHome = () => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkTheme : lightTheme;

  return <img src={logo} alt="Home Icon" />;
};
