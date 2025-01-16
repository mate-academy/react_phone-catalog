import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './PathNavigation.module.scss';

type Props = {
  path?: string[];
  links?: string[];
  goBack?: boolean;
};

export const PathNavigation: React.FC<Props> = ({ path, links, goBack }) => {
  return (
    <nav className={styles.PathNavigation}>
      {path && (
        <Breadcrumbs path={path} links={links} className={styles.Breadcrumbs} />
      )}

      {goBack && (
        <article className={styles.GoBack}>
          <BackLink />
        </article>
      )}
    </nav>
  );
};
