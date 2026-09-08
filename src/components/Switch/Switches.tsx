import { useContext } from 'react';
import { ThemeContext } from '../ColorThemes/ColorThemes';
import './Switches.scss';

export const Switches = () => {
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
            aria-label="Toggle theme between light and dark"
          />
          <button
            type="button"
            className="toggle-btn__input-label"
            onClick={handleThemeChange}
            aria-label="Toggle theme between light and dark"
          ></button>
        </div>
      </div>
    </div>
  );
};
