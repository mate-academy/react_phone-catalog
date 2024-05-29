/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeProvider';
import style from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <label className={style.theme}>
      <div className={style.theme__switch}>
        <input
          type="checkbox"
          className={`${style.theme__switch} ${style.theme__input}`}
          onClick={toggleTheme}
        />
        <span className={style.theme__slider}></span>
      </div>
    </label>
  );
};

export default ThemeToggle;
