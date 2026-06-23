import styles from './ErrorMessage.module.scss';

type Props = {
  message: string;
};
export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles['error-message']}>
      <p className={styles['error-message__text']}>{message}</p>
      <button
        className={styles['error-message__button']}
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
};
