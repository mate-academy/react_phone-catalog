import classNames from 'classnames';
import { Icon } from '../../ui/Icon';
import styles from './GoBackLink.module.scss';
import { Link } from 'react-router-dom';

export const GoBackLink = () => {
  return (
    <div className={styles.goBack}>
      <span className={styles.goBack__link}>
        <Icon iconName="left" />
        <Link to=".." className={classNames('small-text', styles.goBack__text)}>
          Back
        </Link>
      </span>
    </div>
  );
};
