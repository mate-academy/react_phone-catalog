import styles from './styles.module.scss';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type Props =
  | (LinkProps & {
      selected?: boolean;
    })
  | (ButtonHTMLAttributes<HTMLButtonElement> & {
      selected?: boolean;
    });

export const ButtonThird = (props: Props) => {
  if ('to' in props) {
    const { children, selected = false, className, ...linkProps } = props;

    return (
      <Link
        {...linkProps}
        className={classNames(className, styles.button, {
          [styles.selected]: selected,
        })}
      >
        <span className={styles.wrapper}>{children}</span>
      </Link>
    );
  }

  const { children, selected = false, className, type = 'button', ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={classNames(className, styles.button, {
        [styles.selected]: selected,
      })}
    >
      <span className={styles.wrapper}>{children}</span>
    </button>
  );
};
