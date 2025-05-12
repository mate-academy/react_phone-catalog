import heartIcon from 'assets/img/icons/heart.svg';

import styles from './FavoriteButton.module.scss';

type Props = {
  size?: 40 | 48;
};

export const FavoriteButton: React.FC<Props> = ({ size = 40 }) => {
  const sizeClass = size === 40 ? styles.size40 : styles.size48;

  return (
    <button className={`${styles.favoriteButton} ${sizeClass}`}>
      <img alt="favorite" src={heartIcon} />
    </button>
  );
};
