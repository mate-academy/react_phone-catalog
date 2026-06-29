import styles from './Button.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  handleClick?: () => void;
  messageStyles?: boolean;
  isSelected?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  handleClick,
  messageStyles,
  isSelected,
}) => {
  return (
    <button
      className={cn(styles.button, {
        [styles.button_message]: messageStyles,
        [styles.button_selected]: isSelected,
      })}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
