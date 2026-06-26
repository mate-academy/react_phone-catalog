import styles from './ThemeSwitcher.module.scss';

import Icon from '../../shared/Icon';
import { useTheme } from './ThemeSwitcher.hooks';

interface Props {}

const ThemeSwitcher: React.FC<Props> = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher}>
      <Icon
        onClick={toggleTheme}
        iconStyles={{
          icon: ['border', 'width_100'],
          image: theme === 'light' ? 'moon' : 'sun',
        }}
      />
    </div>
  );
};

export default ThemeSwitcher;
