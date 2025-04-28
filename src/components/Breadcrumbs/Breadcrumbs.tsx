import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../Icons/HomeIcon';
import styles from './Breadcrumbs.module.scss';
import { ArrowIcon } from '../Icons/ArrowIcon';
import classNames from 'classnames';

type Props = {
  name?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const { pathname } = useLocation();

  const category = pathname.split('/')[1];

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <HomeIcon />
      </Link>
      <div className={styles.breadcrumbs__arrow}>
        <ArrowIcon />
      </div>

      <Link
        to={`/${category}`}
        aria-disabled={!name}
        className={classNames(styles.breadcrumbs__text, 'text-small-thin', {
          [styles.breadcrumbs__disabled]: !name,
        })}
      >
        {category}
      </Link>

      {name && (
        <div className={styles.breadcrumbs__arrow}>
          <ArrowIcon />
        </div>
      )}
      <p
        className={classNames(
          styles.breadcrumbs__text,
          styles.breadcrumbs__disabled,
          'text-small-thin',
        )}
      >
        {name}
      </p>
    </div>
  );
};
