import { Icon, type IconName } from '../Icon';
import styles from './IconButton.module.scss';

type IconButtonShape = 'default' | 'slider' | 'favorite';

type Props = {
  icon: IconName;
  label: string;
  isSelected?: boolean;
  disabled?: boolean;
  shape?: IconButtonShape;
  className?: string;
  onClick?: () => void;
};

export const IconButton = ({
  icon,
  label,
  isSelected = false,
  disabled = false,
  shape = 'default',
  className = '',
  onClick,
}: Props) => {
  const isFavorite = shape === 'favorite';

  const buttonClassName = [
    styles.button,
    styles[`button--${shape}`],
    isSelected && !isFavorite && styles.buttonSelected,
    isSelected && isFavorite && styles.buttonFavoriteSelected,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClassName}
      type="button"
      aria-label={label}
      aria-pressed={isFavorite ? isSelected : undefined}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={icon} size={16} />
    </button>
  );
};
