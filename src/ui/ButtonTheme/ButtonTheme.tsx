import { useThemeState } from '../../stateManagers/themeState';
import './ButtonTheme.scss';

export const ButtonTheme = () => {
  const { theme, toggleTheme } = useThemeState();

  return (
    <button
      onClick={toggleTheme}
      className={theme}
    ></button>
  );
};
