import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

type Props = {
  message?: string;
  imageSrc?: string;
};

export const NotFoundPage: React.FC<Props> = ({
  message = 'Page not found',
  imageSrc = 'img/page-not-found.png',
}) => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.back}>
        <Link to="/">
          <div className={styles.backContainer}>
            <img
              className={styles.arrowIcon}
              src="img/icons/arrow-down-light-gray.svg"
              alt="arrow-back"
            />
            Back to home
          </div>
        </Link>
      </div>

      <h1 className={styles.notFoundMessage}>{message}</h1>
      <img className={styles.notFoundImg} src={imageSrc} alt="Page not found" />
    </div>
  );
};
