import React from 'react';
import styles from './ErrorLoader.module.scss';
import '../../styles/App.scss';

const ErrorLoader: React.FC = () => {
  function handleReload() {
    window.location.reload();
  }

  return (
    <div className={styles['error-loader']}>
      <h1 className={styles['error-loader__title']}>Something went wrong...</h1>
      <button className={styles['error-loader__button']} onClick={handleReload}>
        Reload
      </button>
    </div>
  );
};

export default ErrorLoader;
