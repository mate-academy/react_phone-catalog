import React, { useState } from 'react';
import { Arrow } from '../Arrow/Arrow';
import styles from './Back.module.scss';
import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../../modules/shared/utils/getTranslation';
import { useNavigate } from 'react-router-dom';

export const Back: React.FC = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      className={styles.back}
      onClick={() => navigate(-1)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Arrow direction="left" fill="var(--back-button-hover-color)" />
      ) : (
        <Arrow direction="left" fill="var(--back-button-default-arrow-color)" />
      )}
      <span
        className={`
        ${styles.backText} 
        ${isHovered ? styles.backTextHover : ''} 
        smallText
      `}
      >
        {t.back.back}
      </span>
    </button>
  );
};
