import styles from './Breadcrumbs.module.scss';
import Icon from '../Icon';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  lastSegment?: string;
}

const Breadcrumbs: React.FC<Props> = ({ lastSegment }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  let currentPath = '';

  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <ol className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item} key="home">
          <Icon href={'/'} iconStyles={{ image: ['home', 'home__active'] }} />
        </li>
        {pathSegments.map((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li
              key={currentPath}
              className={styles.breadcrumbs__item}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Icon iconStyles={{ image: ['arrowRight', 'disabled'] }} />{' '}
              {isLast ? (
                <span className={styles.breadcrumbs__segment}>
                  {lastSegment ? lastSegment : t('bread_crumps.' + segment)}
                </span>
              ) : (
                <Link className={styles.breadcrumbs__item} to={currentPath}>
                  {t('bread_crumps.' + segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
