import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LocationIndicator.module.scss';

type Props = {
  category: string;
  name?: string;
};

export const LocationIndicator: React.FC<Props> = ({ category, name }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <button className={styles.homeBtn} onClick={() => navigate('/')}>
        <img src="/icons/home.png" alt="Home" />
      </button>

      <img
        src="/icons/ChevronArrowRight.svg"
        className={styles.arrow}
        alt="ChevronArrowRight"
      />
      <span className={styles.sectionName}>{category}</span>

      {name && (
        <>
          <img
            src="/icons/ChevronArrowRight.svg"
            className={styles.arrow}
            alt="ChevronArrowRight"
          />
          <span className={styles.sectionName}>{name}</span>
        </>
      )}
    </div>
  );
};
