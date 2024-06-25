import lightArrow from '../../image/Light-Theme/arrow-left.svg';
import darkArrow from '../../image/DarkTheme/arrow-left.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';

export const IconLeft = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkArrow : lightArrow;

  return <img src={logo} alt="Arrow" {...props} />;
};
