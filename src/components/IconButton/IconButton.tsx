import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '@/components/Icon';
import styles from './IconButton.module.scss';

type Props = {
  to: string;
  iconName: IconName;
  label: string;
  count?: number;
};

export const IconButton = ({ to, iconName, label, count }: Props) => (
  <NavLink
    to={to}
    aria-label={label}
    className={({ isActive }) =>
      [styles.button, isActive ? styles.currentPage : '']
        .filter(Boolean)
        .join(' ')
    }
  >
    <span className={styles.iconWrapper}>
      <Icon name={iconName} className={styles.icon} />
      {!!count && <span className={styles.badge}>{count}</span>}
    </span>
  </NavLink>
);
