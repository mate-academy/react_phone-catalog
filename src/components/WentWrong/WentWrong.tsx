import notFoundImg from '../../assets/images/somethingWentWrong.webp';
import styles from './WentWrong.module.scss';

export const WentWrong = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wentWrong}>
      <div className={styles.wentWrong__contain}>
        <h1>Something went wrong</h1>
        <button className={styles.wentWrong__button} onClick={reloadPage}>
          Reload
        </button>
      </div>
      <img
        src={notFoundImg}
        alt="Not found"
        className={styles.wentWrong__img}
      />
    </div>
  );
};
