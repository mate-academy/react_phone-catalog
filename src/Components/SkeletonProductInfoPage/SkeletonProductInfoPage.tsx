import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonProductInfoPage.scss';
import { useThemeState } from '../../stateManagers/themeState';

export const SkeletonProductInfoPage = () => {
  const { theme } = useThemeState();
  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? '#161827' : '#efefefff'}
      highlightColor={theme === 'dark' ? '#1a1c2eff' : '#e2e2e2ff'}
    >
      <div className="product-info-skeleton">
        <h2 className="product-info-skeleton__title">
          <Skeleton
            width={200}
            height={32}
          />
        </h2>

        <div className="product-info-skeleton__main">
          <div className="product-info-skeleton__image">
            <Skeleton
              width="100%"
              height="100%"
            />
          </div>

          <aside className="product-info-skeleton__aside">
            <Skeleton
              width={120}
              height={16}
            />

            <div className="product-info-skeleton__colors">
              <Skeleton
                circle={true}
                width={32}
                height={32}
              />
              <Skeleton
                circle={true}
                width={32}
                height={32}
              />
            </div>

            <div className="product-info-skeleton__divider" />

            <Skeleton
              width={140}
              height={16}
            />

            <div className="product-info-skeleton__capacities">
              <Skeleton
                width={56}
                height={32}
              />
              <Skeleton
                width={56}
                height={32}
              />
            </div>

            <div className="product-info-skeleton__divider" />

            <div className="product-info-skeleton__price-row">
              <Skeleton
                width={80}
                height={24}
              />
              <Skeleton
                width={60}
                height={24}
              />
            </div>

            <div className="product-info-skeleton__actions">
              <Skeleton
                width={160}
                height={40}
              />
              <Skeleton
                circle={true}
                width={40}
                height={40}
              />
            </div>

            <div className="product-info-skeleton__shortspecs">
              <Skeleton count={4} />
            </div>
          </aside>
        </div>

        <div className="product-info-skeleton__details">
          <div className="div-for-grid-first">
            <Skeleton
              width={100}
              height={20}
            />
            <div className="product-info-skeleton__divider" />
            <Skeleton
              count={6}
              height={14}
            />

            <Skeleton
              width={100}
              height={20}
              style={{ marginTop: 16 }}
            />
            <div className="product-info-skeleton__divider" />
            <Skeleton
              count={6}
              height={14}
            />
          </div>

          <div className="div-for-grid-second">
            <Skeleton
              width={100}
              height={20}
            />
            <div className="product-info-skeleton__divider" />
            <Skeleton
              count={6}
              height={14}
            />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
