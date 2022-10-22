import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails | null;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className="details-table">
      <h2>Tech specs</h2>
      <div className="row" />
      <div className="details-table__grid">
        <div className="details-table__options">
          <span className="text text--light text--huge">
            Screen
          </span>
          <span className="text text--light text--huge">
            Resolution
          </span>
          <span className="text text--light text--huge">
            Processor
          </span>
          <span className="text text--light text--huge">
            Ram
          </span>
          <span className="text text--light text--huge">
            Memory
          </span>
          <span className="text text--light text--huge">
            Camera
          </span>
          <span className="text text--light text--huge">
            Weight
          </span>
        </div>
        <div className="details-table__values">
          <span className="text text--huge">
            {product?.display.screenSize}
          </span>
          <span className="text text--huge">
            {product?.display.screenResolution}
          </span>
          <span className="text text--huge">
            {product?.hardware.cpu}
          </span>
          <span className="text text--huge">
            {product?.storage.ram}
          </span>
          <span className="text text--huge">
            {product?.storage.flash}
          </span>
          <span className="text text--huge">
            {product?.camera.primary}
          </span>
          <span className="text text--huge">
            {product?.sizeAndWeight.weight}
          </span>
        </div>
      </div>
    </div>
  );
};
