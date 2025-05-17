import styles from './AddToFavourites.module.scss';

export const AddToFavourites = () => {
  return (
    <>
      <button className={styles.favourites}>
        <img
          className={styles.favourites__heart}
          src="public/icons/Favourite.svg"
          alt="heart-icon"
        />
      </button>
    </>
  );
};
