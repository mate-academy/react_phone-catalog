import cn from 'clsx';
import type { FC } from 'react';

type Props = {
  className?: string;
};

export const SliderButton: FC<Props> = ({ className }) => {
  return <button className={cn('', className)}></button>;
};
