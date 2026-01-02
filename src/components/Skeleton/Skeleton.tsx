import { FC, ReactNode } from 'react';
import styles from './Skeleton.module.scss';
import classNames from 'classnames';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  children?: ReactNode;
}

export const Skeleton: FC<Props> = ({ width, className, height, children }) => {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{ width, height }}
    >
      {children ? children : null}
    </div>
  );
};
