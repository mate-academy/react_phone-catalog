import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  maxWidth?: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
};

export const Button = (props: Props) => {
  const {
    children,
    maxWidth = '160px',
    type = 'button',
    isActive = false,
  } = props;

  return (
    <button
      type={type}
      style={{ maxWidth: maxWidth }}
      className={classNames(styles.button, {
        [styles.button__active]: isActive,
      })}
    >
      {children}
    </button>
  );
};
