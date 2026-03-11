import classNames from 'classnames';
import styles from './ButtonArrow.module.scss';

type Props = {
  direction: string;
  disabled?: boolean;
  onClick: () => void;
};

export const ButtonArrow = ({
  direction,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, {
        [styles.button__disabled]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src="/icons/ArrowUp.svg"
        alt=""
        className={classNames(
          styles.button__icon,
          styles[`button__icon_${direction}`],
        )}
      />
    </button>
  );
};
