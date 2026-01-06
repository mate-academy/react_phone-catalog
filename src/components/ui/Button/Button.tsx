import { Icon, TypeIcon } from '../Icon/Icon';
import './Button.scss';
type ButtonVariant =
  | 'square'
  | 'round'
  | 'icon'
  | 'primary'
  | 'secondary'
  | 'back';

type ButtonProps = {
  variant: ButtonVariant;
  children?: React.ReactNode;
  icon?: TypeIcon;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  active?: boolean;
};

export function Button({
  variant,
  children,
  icon,
  disabled,
  onClick,
  className,
  active,
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} ${className || ''} ${active ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} filled={active} />}
      {children}
    </button>
  );
}

type ColorButtonProps = {
  color: string;
  selected?: boolean;
  onClick?: () => void;
};

export function ColorButton({ color, selected, onClick }: ColorButtonProps) {
  return (
    <button
      className={`color-button ${selected ? 'color-button--selected' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}
