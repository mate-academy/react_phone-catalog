import classNames from 'classnames';
import styles from './IconButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  selected?: boolean;
}

export const IconButton: React.FC<Props> = ({
  children,
  disabled,
  selected,
  className,
  ...props
}) => {
  const classes = classNames(
    styles.btn,
    {
      [styles['btn--active']]: selected,
    },
    className,
  );

  return (
    <button type="button" {...props} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};
