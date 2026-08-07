import { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
  children: React.ReactNode;
};

export const SkeletonProvider: React.FC<Props> = ({ children }) => {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      {children}
    </SkeletonTheme>
  );
};
