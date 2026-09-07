import classNames from 'classnames';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={classNames(styles.loading)}>
      <div className={classNames(styles.loading__spinner)}></div>
    </div>
  );
};
