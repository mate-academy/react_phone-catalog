import heartIcon from 'assets/img/icons/heart.svg';

import styles from './FavoriteButton.module.scss';

export const FavoriteButton: React.FC = () => {
  return (
    <button className={styles.favorite}>
      <img alt="favorite" src={heartIcon} />
    </button>
  );
};
