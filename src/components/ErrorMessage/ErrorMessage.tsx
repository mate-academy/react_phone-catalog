import styles from './ErrorMessage.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onReload }) => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>Something went wrong</p>
      <button className={styles.error__button} onClick={onReload}>
        Reload
      </button>
    </div>
  );
};
