import styles from './Loader.module.scss';

interface Props {
  label?: string;
}

export const Loader = ({ label = 'Loading...' }: Props) => (
  <div className={styles.loader} aria-live="polite">
    <span className={styles.spinner} />
    <span>{label}</span>
  </div>
);
