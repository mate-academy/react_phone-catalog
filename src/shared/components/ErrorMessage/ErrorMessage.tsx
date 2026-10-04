import styles from './ErrorMessage.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorMessage = ({ onReload }: Props) => {
  return (
    <div className={styles.errorMessage}>
      <p>Failed to load data</p>
      <button className={styles.errorMessage__reload} onClick={onReload}>
        Reload
      </button>
    </div>
  );
};
