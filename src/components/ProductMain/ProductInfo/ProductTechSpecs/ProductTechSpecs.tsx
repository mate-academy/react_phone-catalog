import './ProductTechSpecs.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

type ProductTechSpecsProps = {
  someProduct: ProductDetails;
};

const ProductTechSpecs = ({ someProduct }: ProductTechSpecsProps) => {
  return (
    <>
      <div className="product-info__tech-specs">
        <h2 className="product-info__tech-specs--title">Tech specs</h2>
        <div className="product-info__tech-specs--section">
          <span className="product-info__tech-spec--label">Screen</span>
          <span className="product-info__tech-spec--value">
            {someProduct.screen}
          </span>
          <span className="product-info__tech-spec--label">Resolution</span>
          <span className="product-info__tech-spec--value">
            {someProduct.resolution}
          </span>
          <span className="product-info__tech-spec--label">Processor</span>
          <span className="product-info__tech-spec--value">
            {someProduct.processor}
          </span>
          <span className="product-info__tech-spec--label">RAM</span>
          <span className="product-info__tech-spec--value">
            {someProduct.ram}
          </span>
          <span className="product-info__tech-spec--label">
            Built in memory
          </span>
          <span className="product-info__tech-spec--value">
            {someProduct.capacity}
          </span>
          <span className="product-info__tech-spec--label">Camera</span>
          <span className="product-info__tech-spec--value">
            {someProduct.camera}
          </span>
          <span className="product-info__tech-spec--label">Zoom</span>
          <span className="product-info__tech-spec--value">
            {someProduct.zoom}
          </span>
          <span className="product-info__tech-spec--label">Cell</span>
          <span className="product-info__tech-spec--value">
            {someProduct.cell.join(', ')}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductTechSpecs;
