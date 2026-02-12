import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { setTheme } from '../../redux/themeSlice';
import './ThemeSwitcher.scss';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
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
      <label
        htmlFor="theme-select"
        className={`theme-select-title ${currentTheme}`}>
        {t('theme.title')}:
      </label>
      <br/>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={(e) => {
          const newTheme = e.target.value;

          changeTheme(newTheme);
        }}
        className={`theme-select ${currentTheme}`}
      >
        <option value="theme0">{t('theme.theme0')}</option>
        <option value="theme1">{t('theme.theme1')}</option>
        <option value="theme2">{t('theme.theme2')}</option>
        <option value="theme3">{t('theme.theme3')}</option>
        <option value="theme4">{t('theme.theme4')}</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
