import cn from 'classnames';

import { Box } from '@shared/base/Box';

import styles from './Skeleton.module.scss';

export interface SkeletonProps {
  quantity?: number;
  gap?: number;
  direction?: 'row' | 'column';
  height?: number | 'auto';
  width?: number;
  fullWidth?: boolean;
  className?: string;
  itemClassName?: string;
  round?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  quantity = 1,
  gap = 16,
  direction = 'row',
  height = 'auto',
  className,
  fullWidth,
  itemClassName,
  round,
  width,
}) => {
  const containerStyle = {
    gap: `${gap}px`,
    flexDirection: direction,
  };

  const itemStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...(width && { width: `${width}px` }),
    ...(fullWidth && { width: '100%' }),
    ...(round && { borderRadius: '50%' }),
  };

  return (
    <Box
      className={cn(styles.skeletonContainer, className)}
      style={containerStyle}
    >
      {Array.from({ length: quantity }, (_v, idx) => (
        <Box
          key={idx}
          className={cn(styles.skeletonItem, itemClassName)}
          style={itemStyle}
        />
      ))}
    </Box>
  );
};
