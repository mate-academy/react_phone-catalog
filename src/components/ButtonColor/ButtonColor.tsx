import classNames from 'classnames';
import styles from './styles.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export const ButtonColor = ({
  to,
  color,
  selected,
  className,
  ...props
}: LinkProps & {
  to: string;
  color: string;
  selected: boolean;
}) => {
  return (
    <Link {...props} to={to} className={classNames(className, styles.button, { [styles.selected]: selected })}>
      <div className={styles.circle} style={{ backgroundColor: color }}></div>
    </Link>
  );
};
