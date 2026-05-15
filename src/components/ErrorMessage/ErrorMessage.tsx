import { Button } from '../Button';
import styles from './ErrorMessage.module.scss';

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{message}</span>
      <Button variant="primary" onClick={() => window.location.reload()}>
        Reload page
      </Button>
    </div>
  );
};
