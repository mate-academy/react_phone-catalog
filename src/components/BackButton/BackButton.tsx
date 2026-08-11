import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './BackButton.module.scss';

interface Props {
  onClick?: () => void;
  className?: string;
}

export const BackButton: React.FC<Props> = ({ onClick, className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button className={`${styles.backButton} ${className || ''}`} onClick={handleClick} type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={styles.text}>{t('back')}</span>
    </button>
  );
};
