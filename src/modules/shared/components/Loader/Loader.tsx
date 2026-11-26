import styles from './Loader.module.scss';

export function Loader(): JSX.Element {
  return (
    <div className={styles.loader} role="status" aria-label="Loading">
      <div className={styles.spinner} />
      <span className={styles.text}>Loading...</span>
    </div>
  );
}
