import './NoProduct.scss';

export const NoProduct = () => {
  return (
    <div className="container">
      <div className="no-product">
        <h1 className="no-product__title">Sorry. Phone was not found</h1>
        <p className="no-product__text">Please, choose another product</p>
      </div>
    </div>
  );
};
