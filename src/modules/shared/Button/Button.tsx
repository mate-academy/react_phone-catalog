import styles from './Button.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  handleClick?: () => void;
  messageStyles?: boolean;
}

const Button: React.FC<Props> = ({ text, handleClick, messageStyles }) => {
  return (
    <button
      className={cn(styles.button, { [styles.button_message]: messageStyles })}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
