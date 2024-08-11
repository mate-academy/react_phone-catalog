import { useAppDispatch, useAppSelector } from '../../app/hook';
import { toggleTheme } from '../../features/themeSlice';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(
    state => state.themeSwitcher.currentTheme,
  );

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      <button onClick={handleThemeToggle}>
        {currentTheme === 'light'
          ? 'Switch to Dark Theme'
          : 'Switch to Light Theme'}
      </button>
    </div>
  );
};
