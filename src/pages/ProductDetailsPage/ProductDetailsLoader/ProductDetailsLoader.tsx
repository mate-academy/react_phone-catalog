import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ScreenSize } from '../../../types/screenSize';

export const ProductDetailsLoader = () => {
  const isLightTheme = useSelector(
    (state: RootState) => state.currentTheme.theme === 'light-theme',
  );

  const bgColor = isLightTheme ? '#f3f3f3' : '#3b3e4a';

  const isMobile = useMediaQuery(ScreenSize.Mobile);
  const isTablet = useMediaQuery(ScreenSize.Tablet);

  return (
    <div className="product-details-loader">
      {isTablet && (
        <ContentLoader
          speed={1}
          width="100%"
          height={'100%'}
          viewBox="0 0 1200 800"
          backgroundColor={bgColor}
          foregroundColor="#ecebeb"
        >
          {/* Images */}
          <rect x="200" y="20" rx="10" ry="10" width="350" height="470" />
          <rect x="20" y="20" rx="8" ry="8" width="110" height="110" />
          <rect x="20" y="140" rx="8" ry="8" width="110" height="110" />
          <rect x="20" y="260" rx="8" ry="8" width="110" height="110" />
          <rect x="20" y="380" rx="8" ry="8" width="110" height="110" />

          {/* Title */}
          <rect x="630" y="20" rx="5" ry="5" width="500" height="25" />
          <rect x="630" y="60" rx="5" ry="5" width="300" height="20" />

          {/* Colors */}
          <rect x="630" y="120" rx="5" ry="5" width="120" height="20" />
          <circle cx="640" cy="160" r="10" />
          <circle cx="670" cy="160" r="10" />
          <circle cx="700" cy="160" r="10" />
          <circle cx="730" cy="160" r="10" />

          {/* Memory */}
          <rect x="630" y="200" rx="5" ry="5" width="150" height="20" />
          <rect x="630" y="240" rx="5" ry="5" width="80" height="30" />
          <rect x="720" y="240" rx="5" ry="5" width="80" height="30" />
          <rect x="810" y="240" rx="5" ry="5" width="80" height="30" />

          {/* Price */}
          <rect x="630" y="300" rx="5" ry="5" width="100" height="30" />
          <rect x="750" y="300" rx="5" ry="5" width="150" height="30" />

          {/* Button */}
          <rect x="630" y="350" rx="10" ry="10" width="200" height="50" />

          {/* About */}
          <rect x="20" y="550" rx="5" ry="5" width="700" height="25" />
          <rect x="20" y="590" rx="5" ry="5" width="700" height="15" />
          <rect x="20" y="620" rx="5" ry="5" width="650" height="15" />
          <rect x="20" y="650" rx="5" ry="5" width="680" height="15" />
          <rect x="20" y="680" rx="5" ry="5" width="650" height="15" />
          <rect x="20" y="710" rx="5" ry="5" width="700" height="15" />
          <rect x="20" y="740" rx="5" ry="5" width="680" height="15" />

          {/* Tech specs */}
          <rect x="750" y="550" rx="5" ry="5" width="400" height="25" />
          <rect x="750" y="590" rx="5" ry="5" width="400" height="15" />
          <rect x="750" y="620" rx="5" ry="5" width="400" height="15" />
          <rect x="750" y="650" rx="5" ry="5" width="400" height="15" />
          <rect x="750" y="680" rx="5" ry="5" width="400" height="15" />
          <rect x="750" y="710" rx="5" ry="5" width="400" height="15" />
          <rect x="750" y="740" rx="5" ry="5" width="400" height="15" />
        </ContentLoader>
      )}

      {isMobile && (
        <ContentLoader
          speed={1}
          width="100%"
          max-height={800}
          viewBox="0 0 400 1200"
          backgroundColor={bgColor}
          foregroundColor="#ecebeb"
        >
          {/* Title */}
          <rect x="20" y="20" rx="5" ry="5" width="360" height="25" />
          <rect x="20" y="60" rx="5" ry="5" width="240" height="20" />

          {/* Images */}
          <rect x="20" y="100" rx="10" ry="10" width="360" height="360" />
          <rect x="20" y="480" rx="8" ry="8" width="60" height="60" />
          <rect x="90" y="480" rx="8" ry="8" width="60" height="60" />
          <rect x="160" y="480" rx="8" ry="8" width="60" height="60" />
          <rect x="230" y="480" rx="8" ry="8" width="60" height="60" />

          {/* Colors */}
          <rect x="20" y="560" rx="5" ry="5" width="120" height="20" />
          <circle cx="30" cy="600" r="10" />
          <circle cx="60" cy="600" r="10" />
          <circle cx="90" cy="600" r="10" />
          <circle cx="120" cy="600" r="10" />

          {/* Memory */}
          <rect x="20" y="640" rx="5" ry="5" width="150" height="20" />
          <rect x="20" y="680" rx="5" ry="5" width="80" height="30" />
          <rect x="110" y="680" rx="5" ry="5" width="80" height="30" />
          <rect x="200" y="680" rx="5" ry="5" width="80" height="30" />

          {/* Price */}
          <rect x="20" y="740" rx="5" ry="5" width="100" height="30" />
          <rect x="130" y="740" rx="5" ry="5" width="80" height="20" />

          {/* Button */}
          <rect x="20" y="790" rx="10" ry="10" width="200" height="50" />

          {/* Specs */}
          <rect x="20" y="870" rx="5" ry="5" width="150" height="20" />
          <rect x="20" y="900" rx="5" ry="5" width="300" height="15" />
          <rect x="20" y="930" rx="5" ry="5" width="300" height="15" />
          <rect x="20" y="960" rx="5" ry="5" width="300" height="15" />

          {/* About */}
          <rect x="20" y="1000" rx="5" ry="5" width="360" height="20" />
          <rect x="20" y="1030" rx="5" ry="5" width="360" height="15" />
          <rect x="20" y="1060" rx="5" ry="5" width="340" height="15" />
          <rect x="20" y="1090" rx="5" ry="5" width="360" height="15" />
        </ContentLoader>
      )}
    </div>
  );
};
