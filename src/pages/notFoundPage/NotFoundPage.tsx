import EmptyContent from '../../shared/EmptyContent';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <EmptyContent img='img/page-not-found.png'/>
    </div>
  );
};

export default NotFoundPage;
