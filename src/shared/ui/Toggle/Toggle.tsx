import { useTheme } from '../../../store/ThemeContext';
import { IconId } from '../../../types/icons';
import { Icons } from '../Icons';
import style from './Toggle.module.scss';

export const Toggle = () => {
  const { toggleTheme, isChecked } = useTheme();

  return (
    <label className={style.toggleContainer}>
      <input
        type="checkbox"
        className={style.toggle}
        onChange={toggleTheme}
        checked={isChecked}
        aria-label="Toggle dark mode"
      />
      <div className={style.slider}>
        <span className={style.iconWrapper}>
          <Icons id={IconId.Sun} className={style.sun} />
          <Icons id={IconId.Moon} className={style.moon} />
        </span>
      </div>
    </label>
  );
};
