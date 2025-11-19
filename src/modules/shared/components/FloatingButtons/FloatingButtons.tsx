// src/components/FloatingButtons/FloatingButtons.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FloatingButtons.module.scss';

const FloatingButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.floatingContainer}>
      <button 
        className={`${styles.floatingBtn} ${styles.favoriteBtn}`} 
        onClick={() => navigate('/favorites')}
        aria-label="Ir para favoritos"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <button 
        className={`${styles.floatingBtn} ${styles.cartBtn}`} 
        onClick={() => navigate('/cart')}
        aria-label="Ir para carrinho"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;