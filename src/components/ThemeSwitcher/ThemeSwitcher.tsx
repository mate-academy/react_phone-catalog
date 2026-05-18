import React, { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>('');

  const handleChangeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    localStorage.setItem('theme', e.target.value);
  };

  useEffect(() => {
    if (!theme) {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <div className="catalog__dropdown">
        <label
          htmlFor="catalog__sortby"
          className="catalog__sortby_label label"
        ></label>
        <select
          id="catalog__sortby"
          className="catalog__sortby select"
          onChange={handleChangeTheme}
          value={theme}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="orange">Orange</option>
        </select>
      </div>
    </div>
  );
};
