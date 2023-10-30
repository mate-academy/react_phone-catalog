import ContentLoader from 'react-content-loader';

export const ProductCardLoader = () => (
  <div className="product">
    <ContentLoader
      speed={2}
      width={224}
      height={451}
      viewBox="0 0 208 451"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="208" height="208" />
      <rect x="0" y="232" rx="0" ry="0" width="224" height="42" />
      <rect x="0" y="280" rx="0" ry="0" width="108" height="30" />
      <rect x="0" y="318" rx="0" ry="0" width="224" height="1" />

      <rect x="0" y="334" rx="0" ry="0" width="43" height="15" />
      <rect x="167" y="334" rx="0" ry="0" width="57" height="15" />
      <rect x="0" y="357" rx="0" ry="0" width="57" height="15" />
      <rect x="179" y="357" rx="0" ry="0" width="34" height="15" />
      <rect x="0" y="380" rx="0" ry="0" width="28" height="15" />
      <rect x="179" y="380" rx="0" ry="0" width="27" height="15" />
      <rect x="0" y="411" rx="0" ry="0" width="155" height="40" />
      <rect x="165" y="411" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  </div>
);
