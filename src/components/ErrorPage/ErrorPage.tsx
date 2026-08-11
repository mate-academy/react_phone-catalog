import styles from './ErrorPage.module.scss';

type Props = {
  reload: () => void;
};

export const ErrorPage = ({ reload }: Props) => {
  return (
    <div className={styles.error}>
      <div className={styles.error__container}>
        <h2 className={styles.error__title}>Something went wrong</h2>
        <p className={styles.error__message}>Something went wrong</p>
        <button className={styles.error__button} onClick={reload}>
          Reload
        </button>
      </div>
    </div>
  );
};
