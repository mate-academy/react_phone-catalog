import styles from './IconButtonRight.module.scss';

type IconButtonRightProps = {
  className?: string;
  handleClick?: () => void;
  isDisabled: boolean;
};

export const IconButtonRight: React.FC<IconButtonRightProps> = ({
  className,
  handleClick,
  isDisabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Next page"
      disabled={isDisabled}
      className={`${styles.icon} ${styles['icon--button-right']} ${className ?? ''} } ${isDisabled ? styles.disabled : ''}`}
    />
  );
};
