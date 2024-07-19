import React, { useEffect, useState } from 'react';
import { changeTheme } from '../../../../features/User/themeReducer';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const ThemeSwitch: React.FC = () => {
  const { theme } = useAppSelector(state => state.theme);
  const [whichTheme, setWhichTheme] = useState(theme === 'dark');
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    setWhichTheme(prev => !prev);
  };

  useEffect(() => {
    dispatch(changeTheme(whichTheme ? 'dark' : 'light'));
    document.documentElement.setAttribute(
      'data-theme',
      whichTheme ? 'dark' : 'light',
    );
  }, [whichTheme, dispatch]);

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label" htmlFor="theme-toggle">
        <input
          type="checkbox"
          id="theme-toggle"
          className="toggle-switch__input"
          onChange={handleThemeChange}
          checked={whichTheme}
        />
        <span className="toggle-switch__slider"></span>
      </label>
    </div>
  );
};
