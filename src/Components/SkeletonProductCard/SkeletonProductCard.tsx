import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonProductCard.scss';
import { useThemeState } from '../../stateManagers/themeState';

export const SkeletonProductCard = () => {
  const { theme } = useThemeState();

  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? '#161827' : '#efefefff'}
      highlightColor={theme === 'dark' ? '#1a1c2eff' : '#e2e2e2ff'}
    >
      <article className={`skeletonCard`}>
        <div className="skeletonCard__image">
          <Skeleton
            height={196}
            width="100%"
          />
        </div>

        <div className="skeletonCard__title">
          <Skeleton
            height={20}
            count={2}
          />
        </div>

        <div className="skeletonCard__price">
          <Skeleton height={35} />
        </div>

        <hr className="skeletonCard__divider" />

        <div className="skeletonCard__specs">
          <Skeleton
            height={10}
            count={3}
          />
        </div>

        <div className="skeletonCard__buttons">
          <Skeleton
            height={40}
            width={160}
            style={{ borderRadius: 48 }}
          />
          <Skeleton
            height={40}
            width={40}
            style={{ borderRadius: 48 }}
          />
        </div>
      </article>
    </SkeletonTheme>
  );
};
