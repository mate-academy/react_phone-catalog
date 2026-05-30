import styles from './Button.module.scss';

type Props = {
  direction: 'up' | 'down' | 'prev' | 'next';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ direction, disabled, onClick }) => {
  const className = `${styles.button} ${styles[`button__${direction}`]}`;

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={onClick}
    ></button>
  );
};
