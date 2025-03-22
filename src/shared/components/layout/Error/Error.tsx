import styles from './Error.module.scss';

type Props = {
  message: string;
};

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.error}>
      <span>{message}</span>
      <button
        className={styles.reloadButton}
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
};
