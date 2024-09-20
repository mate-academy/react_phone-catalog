import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  text: string;
  active?: boolean;
  className?: string;
};

export const Button: React.FC<Props> = ({ text, active, className }) => {
  return (
    <button
      type="button"
      className={classNames(
        styles.Button,
        active && styles.Button_active,
        className,
      )}
    >
      {text}
    </button>
  );
};
