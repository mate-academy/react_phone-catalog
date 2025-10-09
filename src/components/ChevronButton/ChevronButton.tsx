import React from 'react';
import styles from './ChevronButton.module.css';

export type ChevronButtonProps = {
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
  direction?: 'left' | 'right';
  disabled?: boolean;
};

const ChevronButton: React.FC<ChevronButtonProps> = ({
  onClick,
  'aria-label': ariaLabel = 'Voltar',
  className = '',
  'data-testid': dataTestId = 'chevron-button',
  direction = 'left',
  disabled = false,
}) => {
  const label = ariaLabel ?? (direction === 'left' ? 'Voltar' : 'Avançar');

  return (
    <button
      type="button"
      className={`${styles.container} ${className}`.trim()}
      onClick={onClick}
      aria-label={label}
      data-testid={dataTestId}
      disabled={disabled}
    >
      <svg
        className={`${styles.icon} ${direction === 'right' ? styles.rotate : ''}`}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ChevronButton;
