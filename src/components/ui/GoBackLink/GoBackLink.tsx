import classNames from 'classnames';
import { Icon } from '../../ui/Icon';
import styles from './GoBackLink.module.scss';

export const GoBackLink = () => {
  return (
    <div className={styles.goBack}>
      <a href="#" className={styles.goBack__link}>
        <Icon iconName="left" />
        <span className={classNames('small-text', styles.goBack__text)}>
          Back
        </span>
      </a>
    </div>
  );
};
