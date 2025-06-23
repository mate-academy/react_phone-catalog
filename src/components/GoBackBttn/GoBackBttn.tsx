import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GoBackBttn.module.scss';

interface Props {
  fallbackPath?: string;
  text?: string;
  showIcon?: boolean;
  className?: string;
}

export const GoBackBttn: React.FC<Props> = ({ 
  fallbackPath = '/',
  text = 'Back',
  showIcon = true,
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
  
    if (window.history.length > 1 && location.key !== 'default') {
      navigate(-1);
    } else {
 
      navigate(fallbackPath);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleGoBack();
    }
  };

  return (
    <button 
      className={`${styles.goBackBtn} ${className}`}
      onClick={handleGoBack}
      onKeyDown={handleKeyDown}
      aria-label={`Go back${fallbackPath !== '/' ? ` or go to ${fallbackPath}` : ''}`}
      type="button"
    >
      {showIcon && (
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          className={styles.goBackBtn__icon}
          aria-hidden="true"
        >
          <path 
            d="M10 12L6 8L10 4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className={styles.goBackBtn__text}>{text}</span>
    </button>
  );
};
