import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../Icon/Icon';
import styles from './Breadcrumbs.module.scss';

type Props = {
  firstPath: string;
  secondPath?: string;
};

export const Breadcrumbs = ({ firstPath, secondPath }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__container}>
        <Link className={styles.breadcrumbs__link} to={'/'}>
          <Icon name="home" />
        </Link>

        <Icon name="arrow_right_disabled" />

        <Link
          to={`/${firstPath}`}
          className={cn(styles.breadcrumbs__text, {
            [styles['breadcrumbs__text--active']]: secondPath,
          })}
        >
          {firstPath}
        </Link>

        {secondPath ? (
          <>
            <Icon name="arrow_right_disabled" />

            <p
              className={cn(
                styles.breadcrumbs__text,
                styles['breadcrumbs__text--truncate'],
              )}
            >
              {secondPath}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};
