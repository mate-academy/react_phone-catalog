import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'selected';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  ...props
}) => {
  const buttonClass = `
    ${styles['btn-cart']}
    ${styles[`btn-cart--${variant}`]}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClass}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className={styles['btn-cart__loader']}></span>
      ) : (
        children
      )}
    </button>
  );
};
