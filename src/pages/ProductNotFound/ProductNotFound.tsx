import './ProductNotFound.scss';
import '../../styles/container.scss';

export const ProductNotFound = () => (
  <div className="not-product">
    <div className="container">
      <h2 className="not-product__title">
        Oooops, we can&apos;t find this product...
      </h2>
      <img
        className="not-product__img"
        src="./img/product-not-found.png"
        alt="Product not found"
      />
    </div>
  </div>
);
