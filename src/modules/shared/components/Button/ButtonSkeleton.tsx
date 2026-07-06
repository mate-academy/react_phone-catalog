//#regin imports
import cn from 'classnames';
import { FC } from 'react';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  size?: 'small' | 'medium';
};

export const ButtonSkeleton: FC<Props> = ({ size = 'small' }) => (
  <SkeletonItem
    additionalClass={cn(baseStyles.button, {
      [baseStyles.medium]: size === 'medium',
    })}
  />
);
