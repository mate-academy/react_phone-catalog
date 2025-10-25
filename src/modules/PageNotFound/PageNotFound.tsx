import classNames from 'classnames';
import styles from './PageNotFound.module.scss';

export const PageNotFound: React.FC = () => {
  return <div className={classNames(styles.error)}></div>;
};
