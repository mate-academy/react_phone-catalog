import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './GoBack.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import chevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import { useAppContext } from '../../context/AppContext';

export const GoBack: React.FC = () => {
  const history = useHistory();
  const { theme } = useAppContext();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button className={styles.goBackButton} onClick={handleGoBack}>
      <img
        src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`}
        alt="home"
        className={styles.chevronIcon}
      />
      <div className={styles.goBackText}>
        <div className={styles.label}>Back</div>
      </div>
    </button>
  );
};
