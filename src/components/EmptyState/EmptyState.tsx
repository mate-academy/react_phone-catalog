import styles from './EmptyState.module.scss';

export const EmptyState = ({ message }: { message: string }) => (
  <div className={styles.emptyState}>
    <p>{message}</p>
  </div>
);
