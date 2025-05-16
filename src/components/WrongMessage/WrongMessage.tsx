import styles from './WrongMessage.module.scss';

interface WrongMessageProps {
  title: string;
  showReload?: boolean;
  onReload?: () => void;
}
export const WrongMessage: React.FC<WrongMessageProps> = ({
  title,
  showReload,
  onReload,
}) => {
  return (
    <div className={styles.infoContainer}>
      <p className={styles.message}>{title}</p>

      {showReload && (
        <button className={styles.reloadButton} onClick={onReload}>
          Reload
        </button>
      )}
    </div>
  );
};
