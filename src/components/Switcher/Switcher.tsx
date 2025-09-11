import { useContext } from 'react';
import { ThemeContext } from '../Themes';
import './Switcher.module.scss';

export const Switcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="header-content">
      <div className={`toggle-btn-section ${theme}`}>
        <div className="toggle-checkbox">
          <input
            type="checkbox"
            className="toggle-btn__input"
            onChange={handleThemeChange}
            checked={theme === 'dark'}
            aria-label="Choose theme between dark and light"
          />
          <button
            type="button"
            className="toggle-btn__input-label"
            onClick={handleThemeChange}
            aria-label="Choose theme between dark and light"
          ></button>
        </div>
      </div>
    </div>
  );
};
