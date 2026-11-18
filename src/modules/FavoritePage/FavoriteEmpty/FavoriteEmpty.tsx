import { IoHeartDislikeOutline } from 'react-icons/io5';

import styles from './FavoriteEmpty.module.scss';

export const FavoriteEmpty = () => {
  return (
    <div className={styles['favorite-empty']}>
      <IoHeartDislikeOutline className={styles['favorite-empty__icon']} />
      <p className={styles['favorite-empty__message']}>
        Your favourites list is empty
      </p>
    </div>
  );
};
