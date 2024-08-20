import { useContext } from 'react';
import styles from './NoProductPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../utils/AppContext';
import classNames from 'classnames';

export const NoProductPage = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(AppContext);

  setTimeout(() => navigate('/'), 4000);

  return (
    <main className={isDarkTheme ? styles.mainDark : ''}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2
            className={classNames(
              styles.title,
              isDarkTheme ? styles.titleDark : '',
            )}
          >
            Product not found
          </h2>
          <p
            className={classNames(
              styles.message,
              isDarkTheme ? styles.messageDark : '',
            )}
          >
            You will be redirected to the Homepage
          </p>
        </div>
      </div>
    </main>
  );
};
