import './DetailsSpecs.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  details?: ProductDetails;
};

export const DetailsSpecs: React.FC<Props> = ({ details }) => {
  return (
    <>
      <h2 className="specs__title">
        Tech specs
      </h2>

      <div className="specs__specs-content">
        <div className="specs__info">
          <span className="specs__characteristic">
            Screen
          </span>

          <span className="specs__value">
            {details?.screen}
          </span>

          <span className="specs__characteristic">
            Resolution
          </span>

          <span className="specs__value">
            {details?.resolution}
          </span>

          <span className="specs__characteristic">
            Processor
          </span>

          <span className="specs__value">
            {details?.processor}
          </span>

          <span className="specs__characteristic">
            RAM
          </span>

          <span className="specs__value">
            {details?.ram}
          </span>

          <span className="specs__characteristic">
            Built in memory
          </span>

          <span className="specs__value">
            {details?.capacity}
          </span>

          <span className="specs__characteristic">
            Camera
          </span>

          <span className="specs__value">
            {details?.camera}
          </span>

          <span className="specs__characteristic">
            Zoom
          </span>

          <span className="specs__value">
            {details?.zoom}
          </span>

          <span className="specs__characteristic">
            Cell
          </span>

          <span className="specs__value">
            {details?.cell}
          </span>
        </div>
      </div>
    </>
  );
};
