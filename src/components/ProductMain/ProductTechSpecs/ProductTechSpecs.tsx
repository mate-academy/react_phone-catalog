import './ProductTechSpecs.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';

type ProductTechSpecsProps = {
  currentProduct: ProductDetails;
};

const ProductTechSpecs = ({ currentProduct }: ProductTechSpecsProps) => {
  return (
    <>
      <div className="product-info__tech-specs">
        <h2 className="product-info__tech-specs--title">Tech specs</h2>
        <div className="product-info__tech-specs--section">
          <span className="product-info__tech-spec--label">Screen</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.screen}
          </span>
          <span className="product-info__tech-spec--label">Resolution</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.resolution}
          </span>
          <span className="product-info__tech-spec--label">Processor</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.processor}
          </span>
          <span className="product-info__tech-spec--label">RAM</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.ram}
          </span>
          <span className="product-info__tech-spec--label">
            Built in memory
          </span>
          <span className="product-info__tech-spec--value">
            {currentProduct.capacity}
          </span>
          <span className="product-info__tech-spec--label">Camera</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.camera}
          </span>
          <span className="product-info__tech-spec--label">Zoom</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.zoom}
          </span>
          <span className="product-info__tech-spec--label">Cell</span>
          <span className="product-info__tech-spec--value">
            {currentProduct.cell.join(', ')}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductTechSpecs;
