import classNames from 'classnames';
import styles from './ButtonArrow.module.scss';

type Props = {
  direction: string;
  disabled?: boolean;
};

export const ButtonArrow = ({ direction, disabled = false }: Props) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, {
        [styles.button__disabled]: disabled,
      })}
      disabled={disabled}
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
