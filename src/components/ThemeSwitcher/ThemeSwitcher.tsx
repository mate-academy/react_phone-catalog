import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { setTheme } from '../../redux/themeSlice';
import './ThemeSwitcher.scss';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);

  const changeTheme = (theme: string | undefined) => {
    dispatch(setTheme(theme));
  };

  useEffect(() => {
    if (!currentTheme) {
      console.log('cant see saved theme');
      changeTheme('theme0');
    }
  });

  return (
    <div className="theme-selector">
      <label htmlFor="theme-select">Оберіть тему:</label>
      <br/>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={(e) => {
          const newTheme = e.target.value;

          changeTheme(newTheme);
        }}
        className="theme-select"
      >
        <option value="theme0">Original</option>
        <option value="theme1">Original Dark</option>
        <option value="theme2">Rounded Blue</option>
        <option value="theme3">Rounded Purple</option>
        <option value="theme4">Rounded Orange</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
