import styles from './NotFoundPage.module.scss';
import img from '../../../public/img/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.notfound__page}>
      <h1>404 - Page Not Found</h1>
      <div className={styles.img__wrapper}>
        <img src={img} width={300} height={200} alt="" />
      </div>
    </div>
  );
};
