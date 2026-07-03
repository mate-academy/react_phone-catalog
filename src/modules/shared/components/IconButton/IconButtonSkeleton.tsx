//#region imports
import cn from 'classnames';
import { FC } from 'react';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  size?: 'circle' | 'oval';
};

export const IconButtonSkeleton: FC<Props> = ({ size = 'circle' }) => (
  <SkeletonItem
    additionalClass={cn(baseStyles.button, {
      [baseStyles.oval]: size === 'oval',
    })}
  />
);
