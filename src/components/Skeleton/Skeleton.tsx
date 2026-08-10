import classNames from 'classnames';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangle' | 'circle';
}

export const Skeleton = ({
  className,
  variant = 'rectangle',
}: SkeletonProps) => (
  <span
    aria-hidden="true"
    className={classNames(styles.skeleton, styles[variant], className)}
  />
);
