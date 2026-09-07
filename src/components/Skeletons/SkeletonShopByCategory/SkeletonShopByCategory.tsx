import './SkeletonShopByCategory.scss';

export const SkeletonShopByCategory = () => {
  return (
    <div className="skeleton section__block--link">
      <div className="skeleton__categoryImg"></div>
      <div className="skeleton__categoryText"></div>
    </div>
  );
};
