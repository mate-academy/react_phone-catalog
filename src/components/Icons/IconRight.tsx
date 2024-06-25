import lightArrow from '../../image/Light-Theme/arrow-right.svg';
import darkArrow from '../../image/DarkTheme/arrow-right.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconRight = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkArrow : lightArrow;

  return <img src={logo} alt="Arrow" {...props} />;
};
