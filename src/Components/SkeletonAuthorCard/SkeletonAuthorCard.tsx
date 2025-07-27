import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './SkeletonAuthorCard.scss';
import { useThemeState } from '../../stateManagers/themeState';

export const SkeletonAuthorCard = () => {
  const { theme } = useThemeState();
  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? '#161827' : '#efefefff'}
      highlightColor={theme === 'dark' ? '#1a1c2eff' : '#e2e2e2ff'}
    >
      <article className="skeleton__author">
        <Skeleton
          style={{ minHeight: '540px' }}
          height="100%"
        />
      </article>
    </SkeletonTheme>
  );
};
