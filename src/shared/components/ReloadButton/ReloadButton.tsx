import styles from './ReloadButton.module.scss';

export const ReloadButton = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.reloadButton}
        onClick={() => window.location.reload()}
      >
        Reload
      </div>
    </div>
  );
};
