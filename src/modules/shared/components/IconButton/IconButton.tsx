import classNames from 'classnames';
import styles from './IconButton.module.scss';

type Props = {
  disabled?: boolean;
  onClick?: () => void;
  direction?: 'up' | 'left' | 'right' | 'down';
  icon: React.ReactNode;
  width?: string;
};

export const IconButton: React.FC<Props> = ({
  disabled = false,
  onClick = () => {},
  direction = 'right',
  icon,
  width = '32',
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={classNames(
        `${styles.button}`,
        `${styles[`button--${direction}`]}`,
        `${styles[`button--width-${width}`]}`,
        {
          [styles.disabled]: disabled,
        },
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Arrow ${direction}`}
    >
      {icon}
    </button>
  );
};
