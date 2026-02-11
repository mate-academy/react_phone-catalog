import styles from './Notification.module.scss';

interface Props {
  message: string;
  type: 'success' | 'error';
}

export const Notification: React.FC<Props> = ({ message, type }) => (
  <div
    className={styles.toast}
    data-type={type}
    role={type === 'error' ? 'alert' : 'status'}
    aria-live={type === 'error' ? 'assertive' : 'polite'}
  >
    {message}
  </div>
);
