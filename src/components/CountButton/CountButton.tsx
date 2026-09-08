import React from 'react';
import styles from './CountButton.module.scss';
import '../../styles/App.scss';

interface CountButtonProps {
  children: React.ReactNode;
  active?: boolean;
  value: number;
  setCurrentPage: (currentPage: number) => void;
}

const CountButton: React.FC<CountButtonProps> = ({
  children,
  active = false,
  value,
  setCurrentPage,
}) => {
  return (
    <button
      className={` ${styles.button} ${active ? styles['button--active'] : ''}`}
      onClick={() => setCurrentPage(value)}
    >
      {children}
    </button>
  );
};

export default CountButton;
