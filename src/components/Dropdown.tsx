import { FC } from 'react';
import cn from 'clsx';

type DropdownProps = {
  className?: string;
};

export const Dropdown: FC<DropdownProps> = ({ className }) => {
  return <div className={cn('', className)}></div>;
};
