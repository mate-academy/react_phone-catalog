import { FC } from 'react';
import cn from 'clsx';

interface Props {
  className?: string;
}

export const Skeleton: FC<Props> = ({ className }) => {
  return <div className={cn('animate-pulse', className)}></div>;
};
