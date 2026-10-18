import { Button } from '../Button';
import styles from './ErrorMessage.module.scss';

interface Props {
  onReload: () => void;
}

export const ErrorMessage = ({ onReload }: Props) => (
  <div className={styles['error-message']}>
    <p className={styles['error-message__text']}>Something went wrong</p>
    <Button onClick={onReload}>Reload</Button>
  </div>
);
