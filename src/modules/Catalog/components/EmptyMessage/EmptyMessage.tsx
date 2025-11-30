import styles from './EmptyMessage.module.scss';

interface EmptyMessageProps {
  text?: string;
  imageSrc?: string;
}

export const EmptyMessage = ({ text, imageSrc }: EmptyMessageProps) => (
  <div className={styles.empty}>
    {imageSrc && <img src={imageSrc} alt="Empty" className={styles.image} />}
    {text && <p className={styles.emptyText}>{text}</p>}
  </div>
);
