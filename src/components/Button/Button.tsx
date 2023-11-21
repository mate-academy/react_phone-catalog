import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  onClick?: () => void,
  text: string,
  className?: string,
  isSelected?: boolean,
};

export const Button: React.FC<Props> = ({
  onClick,
  text,
  className = '',
  isSelected = false,
}) => {
  return (
    <button
      type="button"
      className={classNames([styles.button], [className], {
        [styles.selected]: isSelected,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
