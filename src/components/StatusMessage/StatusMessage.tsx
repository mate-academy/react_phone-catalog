import styles from './StatusMessage.module.scss';

type Props = {
  message: string;
  onReload?: () => void;
};

export const StatusMessage = ({ message, onReload }: Props) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
      {onReload && (
        <button
          type="button"
          className={styles.reloadButton}
          onClick={onReload}
        >
          Reload
        </button>
      )}
    </div>
  );
};
