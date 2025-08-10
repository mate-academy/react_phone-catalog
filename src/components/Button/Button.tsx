import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  option?: ButtonVariant;
  className?: string;
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  type = 'button',
  option = 'primary',
  className,
}) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[`button--${option}`], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
