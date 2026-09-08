import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../icons';
import styles from './breadCrumbs.module.scss';
import { icons } from '../../constants/icons';

type Props = {
  location: string[];
};

export const BreadCrumbs: React.FC<Props> = ({ location }) => {
  const formatBreadcrumb = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={styles.breadCrumbs}>
      <div className={styles.container}>
        <ul className={styles.breadCrumbsItems}>
          <li className={styles.breadCrumbsList}>
            <Link to="/" className={styles.breadCrumbsLink}>
              <Icon icon={icons.Home} />
            </Link>
          </li>
          {location.map(loc => (
            <>
              <Icon icon={icons.arrowRightDisabled} />
              <li key={loc} className={styles.breadCrumbsList}>
                <NavLink
                  to={`/${loc}`}
                  className={styles.breadCrumbsLink}
                  style={({ isActive }) => ({
                    color: isActive ? '#0F0F11' : '#89939A',
                  })}
                >
                  {formatBreadcrumb(loc)}
                </NavLink>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
