/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeProvider';
import style from './ThemeToggle.module.scss';
import classNames from 'classnames';

const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <>
      <input
        type="checkbox"
        className={style.theme__checkbox}
        onClick={toggleTheme}
        id="switcher"
        checked={theme}
      />
      <label
        htmlFor="switcher"
        className={classNames(style.theme__switch)}
      ></label>
    </>
  );
};

export default ThemeToggle;
