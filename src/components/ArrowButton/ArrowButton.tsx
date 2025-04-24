import React from 'react';
import styles from './ArrowButton.module.scss';
import '../../styles/App.scss';

interface ArrowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  onHandlePage?: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  children,
  disabled,
  onHandlePage,
}) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles['button--disabled'] : styles['button--active']}`}
      onClick={onHandlePage}
    >
      {children}
    </button>
  );
};

export default ArrowButton;
