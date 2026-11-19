import styles from './Loader.module.scss';

interface LoaderProps {
  count?: number;
}

export const Loader = ({ count = 8 }: LoaderProps) => (
  <div className={styles.loader} role="status" aria-label="Loading">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className={styles.item}>
        <div className={styles.image} />
        <div className={styles.line} />
        <div className={styles.lineShort} />
      </div>
    ))}
  </div>
);
