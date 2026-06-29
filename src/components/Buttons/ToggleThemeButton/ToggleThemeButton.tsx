import { Icon } from '../../Icon';
import { Theme } from '../../../hooks/useTheme';
import style from './ToggleThemeButton.module.scss';
import { THEMES } from '../../../constants/theme';

type Props = {
  currentTheme: Theme;
  handleClick: () => void;
};

export const ToggleThemeButton: React.FC<Props> = ({
  currentTheme,
  handleClick,
}) => {
  const isLightTheme = currentTheme === THEMES.light;
  const iconName = isLightTheme ? 'moon' : 'sun';

  return (
    <button
      type="button"
      className={style.toggleThemeButton}
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      <Icon name={iconName} />
    </button>
  );
};
