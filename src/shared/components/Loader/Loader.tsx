import { useContext } from 'react';
import styles from './Loader.module.scss';
import { AppContext } from '../../../utils/AppContext';
import classNames from 'classnames';

export const Loader = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <div
      className={classNames(
        styles.loaderBox,
        isDarkTheme ? styles.loaderBoxDark : '',
      )}
    >
      <div
        className={classNames(
          styles.loader,
          isDarkTheme ? styles.loaderDark : '',
        )}
      ></div>
    </div>
  );
};
