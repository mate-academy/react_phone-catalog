import { FC } from 'react';
import styles from './NotFoundPage.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { BackButton } from '../../components/BackButton';
import { Link } from 'react-router-dom';
import { HOME } from '../../utils/routes';

export const NotFoundPage: FC = () => {
  const { notFoundUrl } = useIconSrc();

  return (
    <div className={styles.container}>
      <div className={styles.notFoundWrapper}>
        <div className={styles.buttons}>
          <Link to={HOME} className={styles.homeBtn}>
            <p className={styles.buttonText}>Go home</p>
          </Link>
          <BackButton style={{ margin: 0, width: '100px' }} />
        </div>
        <h2 className={styles.title}>Page not found</h2>
        <img
          className={styles.image}
          src={notFoundUrl}
          alt="Image page not found"
        />
      </div>
    </div>
  );
};
