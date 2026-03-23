import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  maxWidth?: string;
  color?: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
};

export const Button = (props: Props) => {
  const {
    children,
    maxWidth = '160px',
    color,
    type = 'button',
    isActive = false,
    onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        maxWidth: maxWidth,
        background: color,
        borderColor: color,
      }}
      className={classNames(styles.button, {
        [styles.button__active]: isActive,
      })}
    >
      {children}
    </button>
  );
};
