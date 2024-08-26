import { memo } from 'react';
import { useTheme } from '../../../app/providers/ThemeProvider';
import icons from '../../../shared/styles/icons.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: Props) => {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={classNames(className, icons['_icon-lightbulb'])}
      onClick={toggleTheme}
    />
  );
});
