import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__content}></div>
    </div>
  );
};
