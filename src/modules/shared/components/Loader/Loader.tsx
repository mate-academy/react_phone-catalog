import cn from 'classnames';
import { LoaderIcon } from 'lucide-react';
import React from 'react';

export const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return <LoaderIcon className={cn('loader', className)} />;
};
