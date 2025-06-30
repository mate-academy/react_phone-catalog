import { useTheme } from '../../../store/ThemeContext';
import style from './Toggle.module.scss';

export const Toggle = () => {
  const { toggleTheme, isChecked } = useTheme();

  return (
    <div className={style.toggleContainer}>
      <input
        type="checkbox"
        id="check"
        className={style.toggle}
        onChange={toggleTheme}
        checked={isChecked}
      />
    </div>
  );
};
