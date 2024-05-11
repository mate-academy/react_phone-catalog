import { useState } from 'react';
import './Toggler.scss';

export const Toggler = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`toggler toggler--${theme}`}
    ></button>
  );
};
