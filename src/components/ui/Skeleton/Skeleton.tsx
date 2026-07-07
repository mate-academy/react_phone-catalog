import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  variant?: 'rect' | 'circle';
  className?: string;
};

export const Skeleton = ({
  width = '100%',
  height = '20px',
  variant = 'rect',
  className = '',
}: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};
