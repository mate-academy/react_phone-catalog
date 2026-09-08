import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import styles from './Loader.module.scss';

export const Loader = () => {
  const { isDark } = useAppSelector(state => state.theme);

  return (
    <span
      className={cn(styles.loader, {
        [styles['loader--dark']]: isDark,
      })}
    ></span>
  );
};
