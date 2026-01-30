import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrap} role="status" aria-live="polite">
      <div className={styles.spinner} />
    </div>
  );
};
