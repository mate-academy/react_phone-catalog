//#region imports
import { FC } from 'react';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
import cn from 'classnames';
//#endregion

type Props = {
  size?: 'small' | 'medium';
};

export const FavButtonSkeleton: FC<Props> = ({ size = 'small' }) => (
  <SkeletonItem
    additionalClass={cn(baseStyles.favButton, {
      [baseStyles.medium]: size === 'medium',
    })}
  />
);
