import styles from './FavoriteButton.module.scss';

export const FavoriteButton: React.FC = () => {
  return (
    <button className={styles.favorite}>
      <img src="img/icons/heart.svg" alt="favorite" />
    </button>
  );
};
