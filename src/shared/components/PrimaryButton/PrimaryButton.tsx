import classNames from 'classnames';
import styles from './PrimaryButton.module.scss';

type Props = {
  mainText: string;
  selectedText?: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  mainText,
  selectedText,
  className,
  onClick,
  isSelected = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button_text', className, styles.primary_Button, {
        [styles.primary_Button__selected]: isSelected,
      })}
    >
      {isSelected ? selectedText : mainText}
    </button>
  );
};
