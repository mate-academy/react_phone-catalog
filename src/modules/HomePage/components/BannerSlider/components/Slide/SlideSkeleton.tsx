import { SkeletonItem } from '../../../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';

export const SlideSkeleton = () => (
  <SkeletonItem additionalClass={baseStyles.slide} />
);
