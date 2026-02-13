import styles from '../styles/message.module.scss';

type Props = {
  msg: string;
  reload?: boolean;
};
export const ErrorMessage = ({ msg, reload }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.message}>{msg}</span>
      {reload && (
        <button
          className={styles.reload}
          onClick={() => window.location.reload()}
        >
          Reload?
        </button>
      )}
    </div>
  );
};
