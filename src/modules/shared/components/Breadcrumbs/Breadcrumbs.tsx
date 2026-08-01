import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { chevronRightGrayIcon, homeIcon } from '@shared/assets/icons';
import styles from './Breadcrumbs.module.scss';

export interface Crumb {
  title: string;
  /** The last crumb is the current page, so it is rendered as plain text. */
  path?: string;
}

interface Props {
  crumbs: Crumb[];
}

export const Breadcrumbs: React.FC<Props> = ({ crumbs }) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('breadcrumbs.label')}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link
            to="/"
            className={styles.home}
            aria-label={t('breadcrumbs.home')}
          >
            <img src={homeIcon} alt="" className="icon" />
          </Link>
        </li>

        {crumbs.map(({ title, path }) => (
          <li key={title} className={styles.item}>
            <img
              src={chevronRightGrayIcon}
              alt=""
              className={cn('icon-muted', styles.separator)}
            />

            {path ? (
              <Link to={path} className={styles.link}>
                {title}
              </Link>
            ) : (
              <span className={styles.current}>{title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
