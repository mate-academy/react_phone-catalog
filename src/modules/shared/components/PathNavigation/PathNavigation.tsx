import { BackButton } from '../BackButton';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './PathNavigation.module.scss';

type Props = {
  path?: string;
  goBack?: boolean;
};

export const PathNavigation: React.FC<Props> = ({ goBack, path }) => {
  return (
    <nav className={styles.PathNavigation}>
      {path && <Breadcrumbs path={path} className={styles.Breadcrumbs} />}

      {goBack && (
        <article className={styles.GoBack}>
          <BackButton />
        </article>
      )}
    </nav>
  );
};
