import './ProductContentBottom.scss';
import { SpecificProduct } from '../../../../types/SpecificProduct';

type Props = {
  selectedPhone: SpecificProduct;
};

export const ProductContentBottom: React.FC<Props> = ({ selectedPhone }) => {
  return (
    <div className="productDetailsPage__content-buttom">
      <div className="productDetailsPage__block-about">
        <h3 className="productDetailsPage__block-title">About</h3>
        <div className="productDetailsPage__line-bottom"></div>

        <div className="productDetailsPage__description">
          {selectedPhone.description.map((chunk, index) => (
            <div className="productDetailsPage__section" key={index}>
              <h4 className="productDetailsPage__section-title">
                {chunk.title}
              </h4>
              <span className="productDetailsPage__section-description">
                {chunk.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="productDetailsPage__block-techSpecs">
        <h3 className="productDetailsPage__block-title">Tech specs</h3>
        <div className="productDetailsPage__line-bottom"></div>

        <div className="productDetailsPage__techSpecs-content">
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">Screen</span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.screen}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">
              Resolution
            </span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.resolution}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">
              Processor
            </span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.processor}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">RAM</span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.ram}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">
              Built in memory
            </span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.capacity}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">Camera</span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.camera}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">Zoom</span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.zoom}
            </span>
          </div>
          <div className="productDetailsPage__techSpecs-block">
            <span className="productDetailsPage__techSpecs-title">Cell</span>
            <span className="productDetailsPage__techSpecs-value">
              {selectedPhone.cell.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
