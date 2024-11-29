import ContentLoader from 'react-content-loader';
import './ProductItemLoader.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const ProductItemLoader = () => {
  const isDarkTheme = useSelector(
    (state: RootState) => state.currentTheme.theme === 'dark-theme',
  );

  const bgColor = isDarkTheme ? '#3b3e4a' : '#f3f3f3';

  return (
    <div className="product-item-loader">
      <ContentLoader
        speed={1}
        width={272}
        height={400}
        viewBox="0 0 288 506"
        backgroundColor={bgColor}
        foregroundColor="#ecebeb"
      >
        <rect
          x="12"
          y="3"
          rx="5"
          ry="5"
          width="calc(100% - 24px)"
          height="242"
        />
        <rect
          x="12"
          y="256"
          rx="5"
          ry="5"
          width="calc(100% - 24px)"
          height="38"
        />
        <rect x="12" y="305" rx="5" ry="5" width="99" height="30" />/
        <rect x="12" y="355" rx="5" ry="5" width="70%" height="13" />
        <rect x="12" y="375" rx="5" ry="5" width="70%" height="13" />
        <rect x="12" y="395" rx="5" ry="5" width="70%" height="13" />
        <rect x="12" y="451" rx="5" ry="5" width="70%" height="38" />
        <rect
          x="220"
          y="451"
          rx="5"
          ry="5"
          width="calc(30% - 28px)"
          height="38"
        />
      </ContentLoader>
    </div>
  );
};
