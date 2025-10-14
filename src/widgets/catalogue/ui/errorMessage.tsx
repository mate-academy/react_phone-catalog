import styles from '../styles/message.module.scss';

export const ErrorMessage = ({ msg }: { msg: string }) => {
  return (
    <div className={styles.message}>
      <span className={styles.message}>{msg}</span>
    </div>
  );
};
