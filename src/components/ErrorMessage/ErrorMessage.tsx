import styles from './ErrorMessage.module.scss';
type Props = {
  errorMessage: string;
  onReload?: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage, onReload }) => {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.errorMessage}>{errorMessage}</span>

      <button className={styles.reloadButton} type="button" onClick={onReload}>
        Reload
      </button>
    </div>
  );
};

export default ErrorMessage;
