import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFound}>
        <img
          className={styles.image}
          src="img/page-not-found.png"
          alt="page-not-found"
        />
      </div>
    </div>
  );
};
