import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <>
      <div className="container">
        <h1 style={{ marginBlockStart: '32px' }}>Page does not exist</h1>
        <div className={styles.wrapper}>
          <img
            className={styles.wrapper__cat}
            src="public/img/product-not-found.png"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
