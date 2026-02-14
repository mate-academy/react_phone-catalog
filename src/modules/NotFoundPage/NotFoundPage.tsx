import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <div className={`${styles.not_found_container}`}>
        <h1 className={`${styles.not_found_title}`}>Not Found 404</h1>
        <img
          src="./img/page-not-found.png"
          alt="not found icon"
          className={`${styles.not_found_image}`}
        />
      </div>
    </>
  );
};
