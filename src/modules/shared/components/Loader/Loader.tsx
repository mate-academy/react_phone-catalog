import classNames from 'classnames';
import styles from './Loader.module.scss';

interface Props {
  className?: string;
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={classNames(styles.loader, className)}>
      <svg className={styles.loader__svg} viewBox="25 25 50 50">
        <circle
          className={styles.loader__circle}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
