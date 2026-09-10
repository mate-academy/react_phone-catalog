/* eslint-disable @typescript-eslint/indent */

import styles from './IconButton.module.scss';
import classNames from 'classnames';

interface BaseProps {
  className?: string;
  disabled?: boolean;
  hasBorder?: boolean;
  onClick?: () => void;
}

type Props =
  | (BaseProps & {
      variant: 'pagination';
      number: number;
      selected?: boolean;
      size?: never;
    })
  | (BaseProps & {
      variant: 'arrow';
      selected?: never;
      rotate?: number;
      size?: never;
    })
  | (BaseProps & {
      variant: 'favorite';
      selected?: boolean;
      rotate?: never;
      size?: 's' | 'm';
    })
  | (BaseProps & {
      variant: 'close' | 'plus' | 'minus';
      selected?: never;
      rotate?: never;
      size?: never;
    });

export const IconButton = (props: Props) => {
  const {
    className,
    variant,
    disabled = false,
    onClick,
    hasBorder = true,
    size = 's',
  } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        styles.baseButton,
        styles[variant],
        styles[size],
        {
          [styles.selected]: props.selected,
          [styles.hasBorder]: hasBorder,
        },
        className,
      )}
      onClick={onClick}
    >
      {variant === 'pagination' ? (
        <span className={styles.number}>{props.number}</span>
      ) : (
        <span
          className={classNames(styles.icon, styles[variant])}
          style={{
            transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
          }}
        />
      )}
    </button>
  );
};
