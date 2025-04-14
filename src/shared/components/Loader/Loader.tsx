import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__spin}></div>
      <img
        src="src\assets\icons\header-icons\logo-icon.svg"
        alt=""
        className={styles.spinner__logo}
      />
    </div>
  );
};
