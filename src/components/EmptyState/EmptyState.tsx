import styles from './EmptyState.module.scss';

type Props = {
  text: string;
  action?: string;
  onAction?: () => void;
};

export default function EmptyState({ text, action, onAction }: Props) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>○</div>

      <h2>{text}</h2>

      {action && onAction && (
        <button type="button" className={styles.button} onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
