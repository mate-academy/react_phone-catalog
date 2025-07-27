import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './FundSkeleton.scss';
import { useThemeState } from '../../stateManagers/themeState';

export const FundSkeleton = () => {
  const { theme } = useThemeState();
  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? '#161827' : '#efefefff'}
      highlightColor={theme === 'dark' ? '#1a1c2eff' : '#e2e2e2ff'}
    >
      <div className="fund-skeleton">
        <div className="fund-skeleton__img">
          <Skeleton
            height={120}
            width={120}
            borderRadius={12}
          />
        </div>
        <div className="fund-skeleton__content">
          <h2>
            <Skeleton width={180} />
          </h2>
          <p>
            <Skeleton count={2} />
          </p>

          <div className="fund-skeleton__stats">
            <p>
              <Skeleton width={100} />
            </p>
            <p>
              <Skeleton width={100} />
            </p>
            <p>
              <Skeleton width={100} />
            </p>
          </div>

          <div className="fund-skeleton__progress-bar">
            <Skeleton height={12} />
          </div>

          <div className="fund-skeleton__button">
            <Skeleton
              height={40}
              width={140}
            />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
