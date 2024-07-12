/* eslint-disable */
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';
import style from './ThemeToggle.module.scss';
import classNames from 'classnames';

const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <div className={style.theme__container}>
      <label className={classNames(style.theme__area)} htmlFor="switcher">
        <input
          type="checkbox"
          className={style.theme__checkbox}
          onChange={toggleTheme}
          id="switcher"
          checked={theme}
        />
        <div className={classNames(style.theme__switch)}></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
