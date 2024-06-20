import lightArrow from '../../image/Light-Theme/arrow-up.svg';
import darkArrow from '../../image/DarkTheme/arrow-up.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';

export const ArrowUp = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme ? darkArrow : lightArrow;

  return <img src={logo} alt="Arrow" {...props} />;
};
