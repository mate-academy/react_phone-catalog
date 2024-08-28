import { useContext } from 'react';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import styles from './NotFoundPage.module.scss';
import classNames from 'classnames';

export const NotFoundPage = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div className={styles.notFound}>
      <h2
        className={classNames(styles.notFound__title, {
          [styles.notFound__title_dark]: !isSunSelected,
        })}
      >
        Page not found
      </h2>
      <div
        className={classNames(styles.notFound__error, {
          [styles.notFound__error_dark]: !isSunSelected,
        })}
      ></div>
    </div>
  );
};
