import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Breadcrumbs.module.scss';
import { useTheme } from '../../../hooks/useTheme';

type Props = {
  breadcrumbsName?: string;
};

export const Breadcrumbs = ({ breadcrumbsName }: Props) => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  const { theme } = useTheme();

  if (breadcrumbsName) {
    paths.splice(-1, 1, breadcrumbsName);
  }

  return (
    <div className={styles.breadcrumbs}>
      <NavLink to="/">
        <img
          src={
            theme === 'dark'
              ? imageUrl('icons/Home_white.svg')
              : imageUrl('icons/Home.svg')
          }
          alt="home-icon"
          className={styles.home}
        />
      </NavLink>
      <div className={styles.wrapper}>
        {paths.map((item, index) => {
          const path = '/' + paths.slice(0, index + 1).join('/');

          return (
            <div key={index} className={styles.group}>
              <span className={styles.arrow}></span>
              <NavLink
                to={path}
                className={classNames(styles.path, {
                  [styles.path__disabled]: item === paths.at(-1),
                })}
              >
                {item}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
