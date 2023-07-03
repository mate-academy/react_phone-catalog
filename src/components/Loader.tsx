import ContentLoader from 'react-content-loader';
import { useDiviceSize } from '../utils/useDiviceSize';

export const Loader = () => {
  const { main } = useDiviceSize();

  return (

    <div className="card">
      {main.size > 700 ? (
        <ContentLoader
          speed={2}
          width={245}
          height={507}
          viewBox="0 0 273 507"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="-1" rx="18" ry="18" width="230" height="323" />
          <rect x="0" y="334" rx="18" ry="18" width="230" height="108" />
          <rect x="0" y="453" rx="16" ry="16" width="230" height="53" />
        </ContentLoader>
      )
        : (
          <ContentLoader
            speed={2}
            width={245}
            height={450}
            viewBox="0 0 273 507"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="10" y="-1" rx="18" ry="18" width="165" height="250" />
            <rect x="0" y="280" rx="18" ry="18" width="180" height="120" />
            <rect x="0" y="420" rx="16" ry="16" width="180" height="60" />
          </ContentLoader>
        )}
    </div>

  );
};
