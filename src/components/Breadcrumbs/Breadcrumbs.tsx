import { Link, useLocation } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import cn from 'classnames';
import { firstLetterCap } from '../../utils/utility';
import { SvgIcon } from '../SvgIcon';

interface Props {
  className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ className }) => {
  const location = useLocation();

  const crumbs = location.pathname
    .replaceAll('#', '')
    .split('/')
    .filter(crumb => !!crumb.length);

  let currentLink = '';

  return (
    <ul className={cn(styles.breadcrumbs, className)}>
      <li className={styles.breadcrumbs__item}>
        <Link className={styles.breadcrumbs__link} to={'/'}>
          <SvgIcon type="home" />
        </Link>
      </li>

      {crumbs.map((crumb, i, arr) => {
        currentLink += `/${crumb}`;
        const title = firstLetterCap(crumb).replaceAll('-', ' ');
        const isLast = i === arr.length - 1;

        return (
          <li key={crumb} className={styles.breadcrumbs__item}>
            {isLast ? (
              <p className={styles['breadcrumbs__last-text']}>{title}</p>
            ) : (
              <Link className={styles.breadcrumbs__link} to={currentLink}>
                {title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
