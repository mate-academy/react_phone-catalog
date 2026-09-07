import style from './Skeleton.module.scss';
import { SkeletonCard } from './SkeletonCard';

type Props = {
  count?: number;
};

export const SkeletonSlider: React.FC<Props> = ({ count }) => {
  return (
    <div className={style.skeletonSlider}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonCard key={index} />
        ))}
    </div>
  );
};
