// eslint-disable-next-line import/no-extraneous-dependencies
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={276}
    height={516}
    viewBox="0 0 276 516"
    backgroundColor="#f3f3f3"
    foregroundColor="#d1d1d1"
  >
    <rect x="32" y="0" rx="0" ry="0" width="210" height="196" />
    <rect x="32" y="220" rx="0" ry="0" width="210" height="41" />
    <rect x="32" y="284" rx="0" ry="0" width="120" height="25" />
    <rect x="32" y="322" rx="0" ry="0" width="204" height="14" />
    <rect x="32" y="345" rx="0" ry="0" width="204" height="14" />
    <rect x="32" y="369" rx="0" ry="0" width="204" height="14" />
    <rect x="33" y="414" rx="0" ry="0" width="140" height="40" />
    <rect x="195" y="415" rx="0" ry="0" width="40" height="40" />
  </ContentLoader>
);

export default Skeleton;
