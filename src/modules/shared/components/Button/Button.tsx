import classNames from 'classnames';
import styles from './Button.module.scss';

type HandleClick = () => void;

type Props = {
  text: string;
  onClick: HandleClick;
  active?: boolean;
  className?: string;
};

export const Button: React.FC<Props> = ({
  text,
  onClick,
  active,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
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
