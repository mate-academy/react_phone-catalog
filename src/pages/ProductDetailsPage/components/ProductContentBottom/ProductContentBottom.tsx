import './ProductContentBottom.scss';
import { ProductDetails } from '../../../../types/ProductDetails';

type Props = {
  selectedProduct: ProductDetails;
};

export const ProductContentBottom: React.FC<Props> = ({ selectedProduct }) => {
  return (
    <div className="detailsPage__content-buttom">
      <div className="detailsPage__block-about">
        <h3 className="detailsPage__block-title">About</h3>
        <div className="detailsPage__line-bottom"></div>

        <div className="detailsPage__description">
          {selectedProduct.description.map((chunk, index) => (
            <div className="detailsPage__section" key={index}>
              <span className="detailsPage__section-title">{chunk.title}</span>
              <span className="detailsPage__section-description">
                {chunk.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detailsPage__block-techSpecs">
        <h3 className="detailsPage__block-title">Tech specs</h3>
        <div className="productDetailsPage__line-bottom"></div>

        <div className="detailsPage__techSpecs-content">
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Screen</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.screen}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Resolution</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.resolution}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Processor</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.processor}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">RAM</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.ram}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">
              Built in memory
            </span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.capacity}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Camera</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.camera}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Zoom</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.zoom}
            </span>
          </div>
          <div className="detailsPage__techSpecs-block">
            <span className="detailsPage__techSpecs-title">Cell</span>
            <span className="detailsPage__techSpecs-value">
              {selectedProduct.cell.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
