import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GoToBack.module.scss';

export const GoToBack: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function goToBack() {
    location.pathname === '/not-found' ? navigate('/') : navigate(-1);
  }

  return (
    <div className={`page__go-to-back ${styles['go-to-back']}`}>
      <div className={styles['go-to-back__container']}>
        <button className={styles['go-to-back__button']} onClick={goToBack}>
          <img src="./img/icons/arrow-left.svg" alt="<"></img> <span>Back</span>
        </button>
      </div>
    </div>
  );
};
