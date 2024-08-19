import classNames from 'classnames';
import { Icon } from '../../ui/Icon';
import styles from './GoBackLink.module.scss';
import { Link, useLocation } from 'react-router-dom';

export const GoBackLink = () => {
  const { state } = useLocation();

  return (
    <div className={styles.goBack}>
      <span className={styles.goBack__link}>
        <Icon iconName="left" />
        <Link
          to={{ pathname: '..', search: state?.search }}
          className={classNames('small-text', styles.goBack__text)}
        >
          Back
        </Link>
      </span>
    </div>
  );
};
