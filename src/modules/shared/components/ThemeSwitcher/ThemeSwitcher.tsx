import classNames from 'classnames';
import styles from './ThemeSwitcher.module.scss';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { toggleTheme, theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <label className={classNames(styles.container, className)}>
      <span className={classNames(styles.theme, styles.light)}>
        <IoSunnyOutline size={12} />
        Light
      </span>
      <span className={classNames(styles.theme, styles.dark)}>
        <IoMoonOutline size={12} />
        Dark
      </span>
      <input
        type="checkbox"
        className="hidden"
        checked={isDark}
        onChange={toggleTheme}
      />
    </label>
  );
};
