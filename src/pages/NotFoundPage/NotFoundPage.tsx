import { Title } from '../../components/Title';
import styles from './NotFoundPage.module.scss';
import image from '../../img/notFound/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__container}>
        <img
          src={image}
          alt="not found image"
          className={styles.notFoundPage__image}
        />
        <Title level={1}>Oooops... page not found</Title>
      </div>
    </div>
  );
};
