import { Link, useLocation } from 'react-router-dom';
import styles from './AvailableCapacity.module.scss';
import cn from 'classnames';

interface Props {
  capacity: string[];
  activeCapacity: string;
  className?: string;
}

export const AvailableCapacity: React.FC<Props> = ({
  capacity,
  activeCapacity,
  className,
}) => {
  const location = useLocation();

  const normalizeCapacity = (cap: string) => {
    let res = '';

    for (let i = 0; i < cap.length; i++) {
      if (cap[i].toLowerCase() === cap[i].toUpperCase()) {
        res += cap[i];
      } else {
        res += ' ' + cap.slice(i);
        break;
      }
    }

    return res;
  };

  const path = location.pathname.toLowerCase();

  return (
    <div className={cn(styles['available-capacity'], className)}>
      <p className={styles['available-capacity__title']}>Select capacity</p>
      <ul className={styles['available-capacity__list']}>
        {capacity.map(cap => {
          const isActive = activeCapacity === cap;
          const currentPath = path
            .split(activeCapacity.toLowerCase())
            .join(cap.toLowerCase());

          return (
            <li className={styles['available-capacity__item']} key={cap}>
              <Link
                className={cn(styles['available-capacity__link'], {
                  [styles['available-capacity__link--active']]: isActive,
                })}
                to={isActive ? '' : currentPath}
              >
                {normalizeCapacity(cap)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
