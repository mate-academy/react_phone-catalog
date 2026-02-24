import React from 'react';
import styles from './IconButtonLeft.module.scss';
type IconButtonLeftProps = {
  className?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
};

export const IconButtonLeft: React.FC<IconButtonLeftProps> = ({
  className,
  handleClick,
  isDisabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Previous page"
      disabled={isDisabled}
      className={`${styles.icon} ${styles['icon--button-left']} ${className ?? ''} ${isDisabled ? styles.disabled : ''}`}
    />
  );
};
