import classNames from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export const ButtonColor = ({
  to,
  color,
  selected,
}: {
  to: string;
  color: string;
  selected: boolean;
}) => {
  return (
    <Link to={to} className={classNames(styles.button, { [styles.selected]: selected })}>
      <div className={styles.circle} style={{ backgroundColor: color }}></div>
    </Link>
  );
};
