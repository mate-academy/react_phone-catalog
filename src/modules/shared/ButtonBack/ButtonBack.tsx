import React, { useEffect, useState } from 'react';
import styles from './ButtonBack.module.scss';

export const ButtonBack: React.FC = () => {
  const [isBackDisabled, setIsBackDisabled] = useState(false);

  useEffect(() => {
    if (window.history.length < 1) {
      setIsBackDisabled(true);
    }
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      return;
    }
  };

  return (
    <div
      onClick={handleGoBack}
      className={`${styles.buttonBack} ${isBackDisabled && styles.buttonDisabled}`}
    >
      <img src="./icons/arrow-left-ico.svg" alt="arrow-back" />
      <p className={styles.buttonBackText}>Back</p>
    </div>
  );
};
