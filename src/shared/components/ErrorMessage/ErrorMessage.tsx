import styles from './ErrorMessage.module.scss';

type Props = {
  message: string;
  onRetry: () => void;
};

export const ErrorMessage = ({ message, onRetry }: Props) => {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.text}>{message}</p>

      <button type="button" className={styles.button} onClick={onRetry}>
        Reload
      </button>
    </div>
  );
};
