import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  onReload?: () => void;
}

export const ErrorMessage = ({ onReload }: ErrorMessageProps) => (
  <div className={styles.error}>
    Something went wrong
    {onReload && <button onClick={onReload}>Reload</button>}
  </div>
);
