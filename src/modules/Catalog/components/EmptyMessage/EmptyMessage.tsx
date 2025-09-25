import styles from './EmptyMessage.module.scss';

interface EmptyMessageProps {
  text?: string;
  imageSrc?: string;
}

export const EmptyMessage = ({
  text = 'There are no phones yet',
  imageSrc,
}: EmptyMessageProps) => (
  <div className={styles.empty}>
    {imageSrc && <img src={imageSrc} alt="Empty" className={styles.image} />}
    <p>{text}</p>
  </div>
);
