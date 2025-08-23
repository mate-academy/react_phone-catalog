import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFormattedPathname } from '../../modules/shared/utils/getFormattedPathname';
import { Arrow } from '../Arrow/Arrow';
import styles from './Back.module.scss';
import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../../modules/shared/utils/getTranslation';

export const Back: React.FC = () => {
  const { pathname } = useLocation();
  const { language } = useAppState();
  const t = getTranslation(language);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/${getFormattedPathname(pathname)[0]}`}
      className={styles.back}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Arrow direction='left' fill='var(--back-button-hover-color)' />
      ) : (
        <Arrow direction='left' fill='var(--back-button-default-arrow-color)' />
      )}
      <span className={`
        ${styles.backText} 
        ${isHovered ? styles.backTextHover : ''} 
        smallText
      `}>{t.back.back}</span>
    </Link>
  );
};
