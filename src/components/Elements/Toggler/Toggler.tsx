import { useThemeContext } from '../../../context/ThemeContext';
import './Toggler.scss';

export const Toggler = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`toggler toggler--${theme}`}
    ></button>
  );
};
