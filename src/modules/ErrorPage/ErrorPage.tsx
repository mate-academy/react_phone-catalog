import { Link } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
  title: string;
};

export const ErrorPage = ({ title }: ErrorPageProps) => {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.error__title}>{title}</p>

      <Link to="/" className={styles.error__home}>
        Go to home
      </Link>
    </div>
  );
};
