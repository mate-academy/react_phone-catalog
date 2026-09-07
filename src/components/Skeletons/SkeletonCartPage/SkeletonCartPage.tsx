import './SkeletonCartPage.scss';

export const SkeletonCartPage = () => {
  return (
    <div className="skeleton skeleton__item">
      <div className="skeleton__item--info"></div>
      <div className="skeleton__item--count"></div>
    </div>
  );
};

export const SkeletonCartTotalItems = () => {
  return (
    <div className="skeleton skeleton__checkout">
      <div className="skeleton__checkout--text"></div>
      <div className="skeleton__checkout--button"></div>
    </div>
  );
};
