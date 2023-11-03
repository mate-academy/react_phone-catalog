import { Icon } from '../../shared/Icon';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  const total = 3;

  return (
    <Icon className={styles.icon} id="heart" count={total} />
  );
};
