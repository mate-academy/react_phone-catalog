import ContentLoader from 'react-content-loader';

export const BannerLoader = () => (
  <ContentLoader
    speed={2}
    width={1040}
    height={400}
    viewBox="0 0 1040 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="1040" height="400" />
  </ContentLoader>
);
