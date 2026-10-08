import './ProductSkeleton.scss';

export const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image" />

      <div className="product-skeleton__title" />

      <div className="product-skeleton__price" />

      <div className="product-skeleton__button" />
    </div>
  );
};
