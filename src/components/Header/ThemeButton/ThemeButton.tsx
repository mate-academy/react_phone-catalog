/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeProvider';
import style from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className={style.theme}>
      <label className={style.theme__switch} htmlFor="switch">
        <input
          type="checkbox"
          className={`${style.theme__switch} ${style.theme__input}`}
          id="switch"
          onClick={toggleTheme}
        />
        <span className={style.theme__slider}></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
