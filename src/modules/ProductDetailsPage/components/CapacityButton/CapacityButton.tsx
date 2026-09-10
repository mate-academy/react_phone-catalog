import { NavLink } from 'react-router-dom';
import styles from './CapacityButton.module.scss';
import classNames from 'classnames';

interface Props {
  value: string;
  to: string;
}

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.capacityButton, { [styles.active]: isActive });

export const CapacityButton = ({ value, to }: Props) => {
  return (
    <NavLink to={to} className={getLinkClass}>
      <span className={styles.value}>{value}</span>
    </NavLink>
  );
};
