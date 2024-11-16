import cn from 'classnames';

import { Box } from '@shared/base/Box';

import styles from './Skeleton.module.scss';

export interface SkeletonProps {
  quantity?: number;
  gap?: number;
  direction?: 'row' | 'column';
  height?: number | 'auto';
  width?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  quantity = 1,
  gap = 16,
  direction = 'row',
  height = 'auto',
  className,
  width,
}) => {
  const containerStyle = {
    gap: `${gap}px`,
    flexDirection: direction,
  };

  const itemStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...(width && { width: `${width}px` }),
  };

  return (
    <Box
      className={cn(styles.skeletonContainer, className)}
      style={containerStyle}
    >
      {Array.from({ length: quantity }, (_v, idx) => (
        <Box key={idx} className={styles.skeletonItem} style={itemStyle} />
      ))}
    </Box>
  );
};
