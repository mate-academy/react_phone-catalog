import { Link, useLocation } from 'react-router-dom';
import styles from './AvailableCapacity.module.scss';
import cn from 'classnames';

interface Props {
  capacity: string[];
  current: string;
  className?: string;
}

export const AvailableCapacity: React.FC<Props> = ({
  capacity,
  current,
  className,
}) => {
  const location = useLocation();

  const normalizeCapacity = capacity.map(c => {
    let res = '';

    for (let i = 0; i < c.length; i++) {
      if (c[i].toLowerCase() === c[i].toUpperCase()) {
        res += c[i];
      } else {
        res += ' ' + c.slice(i);
        break;
      }
    }

    return res;
  });

  const path = location.pathname;

  return (
    <div className={cn(styles['available-capacity'], className)}>
      <p className={styles['available-capacity__title']}>Select capacity</p>
      <ul className={styles['available-capacity__list']}>
        {normalizeCapacity.map(c => {
          const activeCapacity = c.replaceAll(' ', '');
          const isActive = activeCapacity === current;
          const pathArr = path.split('-');

          pathArr[pathArr.length - 2] = activeCapacity;
          const currentPath = pathArr.join('-');

          return (
            <li className={styles['available-capacity__item']} key={c}>
              <Link
                className={cn(styles['available-capacity__link'], {
                  [styles['available-capacity__link--active']]: isActive,
                })}
                to={isActive ? '' : currentPath}
              >
                {c}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
