import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  text: string;
  activeText?: string;
  selected?: boolean;
  disabled?: boolean;
  size?: 's' | 'm';
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  text,
  activeText,
  selected = false,
  disabled,
  size = 's',
  className,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        styles.button,
        styles[size],
        { [styles.isSelected]: selected },
        className,
      )}
      onClick={onClick}
    >
      <span className={styles.text}>{selected ? activeText : text}</span>
    </button>
  );
};
