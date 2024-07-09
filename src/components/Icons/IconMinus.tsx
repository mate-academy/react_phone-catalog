import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/minus.svg';
import lightLogo from '../../image/Light-Theme/minus.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconMinus = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} {...props} alt="MinusLogo" />;
};
