import { useContext } from 'react';
import { ThemeContext } from '../Themes';
import './Switcher.scss';

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
            className="toggle-btn__input"
            type="checkbox"
            onChange={handleThemeChange}
            checked={theme === 'dark'}
            aria-label="Toggle theme between dark and light"
          />
          <button
            type="button"
            className="toggle-btn__input-label"
            onClick={handleThemeChange}
            aria-label="Toggle theme between dark and light"
          ></button>
        </div>
      </div>
    </div>
  );
};
