// eslint-disable-next-line import/no-extraneous-dependencies
import ContentLoader from 'react-content-loader';
import useDarkThemeStore from '../../../store/darkThemeStore';

const Skeleton = () => {
  const { theme } = useDarkThemeStore();

  return (
    <ContentLoader
      speed={2}
      width={276}
      height={516}
      viewBox="0 0 276 516"
      backgroundColor={theme === 'dark' ? '#f3f3f31f' : '#f3f3f3'}
      foregroundColor={theme === 'dark' ? '#f3f3f350' : '#d1d1d1'}
    >
      <rect x="32" y="5" rx="0" ry="0" width="210" height="225" />
      <rect x="32" y="284" rx="0" ry="0" width="120" height="25" />
      <rect x="32" y="365" rx="0" ry="0" width="204" height="14" />
      <rect x="32" y="390" rx="0" ry="0" width="204" height="14" />
      <rect x="32" y="415" rx="0" ry="0" width="204" height="14" />
      <rect x="33" y="440" rx="0" ry="0" width="155" height="40" />
      <rect x="195" y="440" rx="0" ry="0" width="37" height="40" />
      <rect x="32" y="245" rx="0" ry="0" width="210" height="30" />
      <rect x="32" y="328" rx="0" ry="0" width="210" height="1" />
    </ContentLoader>
  );
};

export default Skeleton;
