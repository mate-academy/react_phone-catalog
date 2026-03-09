//styles
import classNames from 'classnames';
import styles from './Loader.module.scss';

type Props = {
  className?: string;
};

export const Loader: React.FC<Props> = ({ className }) => (
  <div className={classNames(styles.loader, className)}>
    <div className={styles.outsideBlock}>
      <div className={styles.insideBlock}></div>
    </div>
  </div>
);
