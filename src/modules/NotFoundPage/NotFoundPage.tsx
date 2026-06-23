import styles from './NotFoundPage.module.scss';
import ArrowLeft from '/img/product-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div>NotFoundPage</div>
      <img src={ArrowLeft} alt="" />
    </div>
  );
};
