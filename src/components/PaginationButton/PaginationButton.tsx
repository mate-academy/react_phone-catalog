import styles from './PaginationButton.module.scss';

type Props = {
  page: number;
  label: string;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const PaginationButton = ({
  page,
  label,
  isSelected = false,
  disabled = false,
  onClick,
}: Props) => {
  const className = [styles.button, isSelected && styles.buttonSelected]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-current={isSelected ? 'page' : undefined}
      onClick={onClick}
    >
      {page}
    </button>
  );
};
