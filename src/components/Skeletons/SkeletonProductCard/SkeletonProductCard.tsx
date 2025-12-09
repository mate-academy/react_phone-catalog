import './SkeletonProductCard.scss';

export const SkeletonProductCard = () => {
  return (
    <div className="skeleton productCard">
      <div className="skeleton__img"></div>

      <div className="skeleton__text"></div>
      <div className="skeleton__buttons"></div>
    </div>
  );
};
