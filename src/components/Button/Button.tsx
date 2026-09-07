import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  textContent: string;
  className: string[];
  onClick: () => void;
  color?: string;
};

export const Button: React.FC<Props> = ({
  color,
  textContent,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={cn(
        styles.button,
        className.map(c => styles[c]),
      )}
    >
      {textContent}
    </button>
  );
};
