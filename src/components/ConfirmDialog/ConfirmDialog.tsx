import { Button } from '../Button';
import styles from './ConfirmDialog.module.scss';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({ message, onConfirm, onCancel }: Props) => (
  <div
    className={styles['confirm-dialog']}
    onClick={onCancel}
    role="presentation"
  >
    <div
      className={styles['confirm-dialog__window']}
      role="dialog"
      aria-modal="true"
      onClick={event => event.stopPropagation()}
    >
      <p className={styles['confirm-dialog__message']}>{message}</p>

      <div className={styles['confirm-dialog__actions']}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  </div>
);
