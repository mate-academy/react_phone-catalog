import { PRODUCT_COLORS } from '../../constants/productColors';
import { normalizeProductOption } from '../../utils';
import styles from './ColorButton.module.scss';

type Props = {
  color: string;
  label: string;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const ColorButton = ({
  color,
  label,
  isSelected = false,
  disabled = false,
  onClick,
}: Props) => {
  const className = [styles.button, isSelected && styles.buttonSelected]
    .filter(Boolean)
    .join(' ');

  const normalizedColor = normalizeProductOption(color);
  const buttonColor = PRODUCT_COLORS[normalizedColor] || color;

  return (
    <button
      className={className}
      type="button"
      aria-label={label}
      aria-pressed={isSelected}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={styles.color}
        style={{ backgroundColor: buttonColor }}
        aria-hidden="true"
      />
    </button>
  );
};
