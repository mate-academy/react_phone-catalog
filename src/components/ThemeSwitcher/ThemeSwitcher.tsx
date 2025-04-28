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
      changeTheme('theme0');
    }
  });

  return (
    <div className="theme-selector">
      <label htmlFor="theme-select">Тема сайту: {currentTheme}</label>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={(e) => {
          const newTheme = e.target.value;

          changeTheme(newTheme);
        }}
        className="theme-select"
      >
        <option value="theme0">Класична</option>
        <option value="theme1">Темна</option>
        <option value="theme2">Світла</option>
        <option value="theme3">Контрастна</option>
        <option value="theme4">Мінімалістична</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
