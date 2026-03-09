//styles
import styles from './Button.module.scss';

//services
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'iconType' | 'round';
type ButtonSize = 'xs' | 'sm' | 'md';

type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  selected?: boolean;
  colorHex?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = 'primary',
  size = 'sm',
  colorHex,
  selected = false,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles[variant],
        [styles[`${variant}--${size}`]],
        {
          [styles[`${variant}--selected`]]: selected,
        },
        className,
      )}
      style={{ backgroundColor: colorHex }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
