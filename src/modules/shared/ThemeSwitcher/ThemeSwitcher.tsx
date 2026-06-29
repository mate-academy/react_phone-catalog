import styles from './ThemeSwitcher.module.scss';

import Icon from '../Icon';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { layoutThemeActions } from '../../../store';

interface Props {
  header?: boolean;
}

const ThemeSwitcher: React.FC<Props> = ({ header = false }) => {
  const { theme } = useAppSelector(state => state.layoutTheme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => dispatch(layoutThemeActions.toggleTheme());

  return header ? (
    <>
      <Icon
        onClick={toggleTheme}
        iconStyles={{
          icon: 'type_mobile_menu',
          image: theme === 'light' ? 'moon' : 'sun',
        }}
      />
    </>
  ) : (
    <div className={styles.themeSwitcher}>
      <Icon
        onClick={toggleTheme}
        iconStyles={{
          icon: ['border', 'width_100', 'type_add'],
          image: theme === 'light' ? 'moon' : 'sun',
        }}
      />
    </div>
  );
};

export default ThemeSwitcher;
