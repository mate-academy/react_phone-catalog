import styles from './AddToFavourites.module.scss';

export const AddToFavourites = () => {
  return (
    <>
      <button className={styles.favourites}>
        <img
          className={styles.favourites__heart}
          src="public/icons/Vector (Stroke).png"
          alt="heart-icon"
        />
      </button>
    </>
  );
};
