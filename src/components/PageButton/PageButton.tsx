import React from 'react';
import styles from './PageButton.module.scss';
import '../../styles/App.scss';

interface PageButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onSwitchPage?: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  children,
  disabled,
  onSwitchPage,
}) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles['button--disabled'] : styles['button--active']}`}
      onClick={onSwitchPage}
    >
      {children}
    </button>
  );
};

export default PageButton;
