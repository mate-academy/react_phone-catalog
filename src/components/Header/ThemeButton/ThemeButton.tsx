/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeProvider';
import style from './ThemeToggle.module.scss';
import classNames from 'classnames';

const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <label htmlFor="" className={classNames({ [style.theme__check]: theme })}>
      <input
        type="text"
        className={classNames(style.theme__switch)}
        onClick={toggleTheme}
      />
    </label>
  );
};

export default ThemeToggle;
