import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails | null;
};

export const Details: React.FC<Props> = ({ product }) => {
  return (
    <div className="details-table">
      <div className="details-table__grid">
        <div className="details-table__options">
          <span className="small-text small-text--light small-text--huge">
            Screen
          </span>
          <span className="small-text small-text--light small-text--huge">
            Resolution
          </span>
          <span className="small-text small-text--light small-text--huge">
            Processor
          </span>
          <span className="small-text small-text--light small-text--huge">
            Ram
          </span>
        </div>
        <div className="details-table__values">
          <span className="small-text small-text--huge">
            {product?.display.screenSize}
          </span>
          <span className="small-text small-text--huge">
            {product?.display.screenResolution}
          </span>
          <span className="small-text small-text--huge">
            {product?.hardware.cpu.slice(0, 37)}
          </span>
          <span className="small-text small-text--huge">
            {product?.storage.ram}
          </span>
        </div>
      </div>
    </div>
  );
};
