import { SkeletonItem } from '../../../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';

export const ColorItemSkeleton = () => (
  <SkeletonItem additionalClass={baseStyles.colorItem} />
);
