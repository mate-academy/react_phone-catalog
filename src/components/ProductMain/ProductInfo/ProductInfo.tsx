import './ProductInfo.scss';

const ProductInfo = () => {
  return (
    <>
      <h1 className="product-info__title"></h1>
      <div className="product-info__price">
        <span className="product-info__price--regular"></span>
        <span className="product-info_price--discount"></span>
      </div>
    </>
  );
};

export default ProductInfo;
