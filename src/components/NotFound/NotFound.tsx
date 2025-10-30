import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="/img/page-not-found.png"
        alt="not found"
      />
    </div>
  );
};

export default NotFound;
