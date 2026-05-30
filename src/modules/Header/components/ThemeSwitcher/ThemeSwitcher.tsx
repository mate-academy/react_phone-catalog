import { useContext } from 'react';
import { ThemeContext } from '../../../../contex/Theme';
import { Theme } from '../../../../utils/constants';

import styles from './ThemeSwitcher.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
}

export const ThemeSwitcher: React.FC<Props> = ({ className }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={cn(styles['theme-switcher'], className)}>
      {theme === Theme.LIGTH ? (
        <button
          className={cn(
            styles['theme-switcher__btn'],
            styles['theme-switcher__btn--dark'],
          )}
          onClick={() => setTheme(Theme.DARK)}
          aria-label="Switch to dark theme"
        />
      ) : (
        <button
          className={cn(
            styles['theme-switcher__btn'],
            styles['theme-switcher__btn--light'],
          )}
          onClick={() => setTheme(Theme.LIGTH)}
          aria-label="Switch to light theme"
        />
      )}
    </div>
  );
};
