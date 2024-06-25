import lightArrow from '../../image/Light-Theme/arrow-down.svg';
import darkArrow from '../../image/DarkTheme/arrow-down.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconDown = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkArrow : lightArrow;

  return <img src={logo} alt="Arrow" {...props} />;
};
