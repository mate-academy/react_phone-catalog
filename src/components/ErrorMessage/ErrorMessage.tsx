import styles from './ErrorMessage.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorMessage = ({ onReload }: Props) => (
  <div className={styles.container} role="alert">
    <p className={styles.message}>Something went wrong</p>

    <button type="button" className={styles.button} onClick={onReload}>
      Reload
    </button>
  </div>
);
