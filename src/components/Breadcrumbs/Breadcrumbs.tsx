import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const { category, itemName } = useParams();

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home} />
      <div className={styles.breadcrumbs__arrow} />
      <Link
        to={`/${category}`}
        className={classNames(styles.breadcrumbs__text, {
          [styles['breadcrumbs__text--active']]: !itemName,
        })}
      >
        {category ? category : 'favorites'}
      </Link>
      {itemName && (
        <>
          <div className={styles.breadcrumbs__arrow} />
          <div
            className={classNames(styles.breadcrumbs__text, {
              [styles['breadcrumbs__text--active']]: !itemName,
            })}
          >
            {itemName}
          </div>
        </>
      )}
    </div>
  );
};
