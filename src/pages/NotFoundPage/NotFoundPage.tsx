import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

type Props = {
  title?: string;
};

export const NotFoundPage = ({ title = 'Page not found' }: Props) => (
  <div className={styles.notFoundPage}>
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <Link to="/" className={styles.homeLink}>
        <img
          src="/img/Home_breadcrumb.svg"
          alt="Home"
          className={styles.homeIcon}
        />
        Back to home
      </Link>
    </div>
  </div>
);
