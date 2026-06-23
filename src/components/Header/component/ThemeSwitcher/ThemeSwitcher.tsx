import { useContext } from 'react';
import style from './ThemeSwitcher.module.scss';
import { ThemeContext } from '../../../../provider/ThemeContextProvider';
import cn from 'classnames';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const variant = theme === 'white' ? 'dark' : 'white';

  return (
    <div
      className={cn(style.switcher, {
        [style[`switcher--${theme}`]]: theme,
      })}
      onClick={() => setTheme(variant)}
    ></div>
  );
};
