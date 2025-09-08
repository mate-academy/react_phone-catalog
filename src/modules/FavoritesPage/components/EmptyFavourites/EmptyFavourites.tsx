import styles from './EmptyFavourites.module.scss';

export const EmptyFavourites = () => {
  return (
    <div className={styles.emptyBlock}>
      <h3>No Favorites Yet!</h3>
    </div>
  )
}
