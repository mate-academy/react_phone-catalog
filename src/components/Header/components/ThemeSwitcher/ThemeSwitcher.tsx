import { useAppContext } from '../../../../context/app/useAppContext';
import s from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <div className={s.themeSwitcher}>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={isDark}
        onChange={toggleTheme}
        className={s.toggleInput}
      />
      <label htmlFor="theme-toggle" className={s.toggleLabel}>
        <img
          src="../../../../../public/icons/sun.svg"
          alt="sun"
          className={`${s.icon} ${s.iconSun}`}
        />
        <img
          src="../../../../../public/icons/moon.svg"
          alt="moon"
          className={s.icon}
        />
        <span className={s.toggleCircle}></span>
      </label>
    </div>
  );
};
