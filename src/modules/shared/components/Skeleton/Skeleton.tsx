import classNames from 'classnames';
import styles from './Skeleton.module.scss';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<Props> = ({ className, style }) => (
  <div
    className={classNames(styles.skeleton, className)}
    style={style}
    aria-hidden="true"
  />
);
