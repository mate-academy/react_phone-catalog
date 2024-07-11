import { ReactNode } from 'react';
import style from './Skeleton.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
  children?: ReactNode;
  variant?: 'rect' | 'circle' | 'text';
  width?: number;
  height?: number;
};

export const Skeleton: React.FC<Props> = ({
  className,
  children,
  variant,
  width,
  height,
}) => {
  let styles: any = {};
  const skeletonClasses = classNames(
    `${style.skeleton} ${styles.skeleton__overlay} ${style[`skeleton-${variant}`]}`,
    className,
  );

  if (variant !== 'text') {
    styles.width = width;
    styles.height = height;
  }
  return (
    <div className={skeletonClasses} style={styles}>
      <div className={styles.skeleton__overlay}>{children}</div>
    </div>
  );
};
