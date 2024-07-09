import { useContext } from 'react';
import darkLogo from '../../image/DarkTheme/plus.svg';
import lightLogo from '../..//image/Light-Theme/plus.svg';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconPlus = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkLogo : lightLogo;

  return <img src={logo} {...props} alt="PlusLogo" />;
};
