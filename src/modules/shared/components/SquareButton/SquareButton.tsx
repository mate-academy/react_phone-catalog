import classNames from 'classnames';
import styles from './SquareButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  selected?: boolean;
  width?: number;
}

export const SquareButton: React.FC<Props> = ({
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
    <button type="button" className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
