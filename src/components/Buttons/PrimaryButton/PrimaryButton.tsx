import cn from 'classnames';
import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
  mainText: string;
  selectedText?: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  mainText,
  selectedText,
  className,
  onClick,
  isSelected = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, {
        [styles.button__selected]: isSelected,
      })}
      disabled={isSelected}
    >
      {isSelected ? selectedText : mainText}
    </button>
  );
};
