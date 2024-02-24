import { memo } from 'react';
import cn from 'classnames';
import { IconProps } from './types';
import './Icon.scss';

export const Icon = memo<IconProps>(({ icon, counter = 0 }) => (
  <div className="icon">
    <span
      className={cn('icon__image', {
        [`icon__image-${icon}`]: icon,
      })}
    />
    {counter > 0 && (
      <span className="icon__counter">
        {counter}
      </span>
    )}
  </div>
));
