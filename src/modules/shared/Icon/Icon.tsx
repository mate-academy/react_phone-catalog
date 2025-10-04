import { FC, memo } from 'react';
import './Icon.scss';
import { IconProps } from './types/types';

export const Icon: FC<IconProps> = memo(({ icon, className = '' }) => {
  const combinedClassName = `icon${className ? ` ${className}` : ''}`.trim();

  return <img src={icon.path} alt={icon.title} className={combinedClassName} />;
});

Icon.displayName = 'Icon';
