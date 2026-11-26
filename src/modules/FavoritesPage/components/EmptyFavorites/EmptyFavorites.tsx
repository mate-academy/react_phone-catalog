import styles from './EmptyFavorites.module.scss';

export function EmptyFavorites(): JSX.Element {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <p className={styles.message}>There are no favourites yet</p>
    </div>
  );
}
