import styles from './ErrorState.module.scss';

interface Props {
  message?: string;
}

export const ErrorState = ({ message = 'Something went wrong' }: Props) => (
  <div className={styles.error}>
    <p className={styles.message}>{message}</p>
    <button
      type="button"
      className={styles.button}
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  </div>
);
