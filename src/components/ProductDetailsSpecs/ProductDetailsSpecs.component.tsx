import { useContext } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';
import { Line } from '../base/Line/Line.component';

export const ProductDetailsSpecs = () => {
  const { selectedProduct } = useContext(StatesContext);

  if (selectedProduct) {
    return (
      <div className="productDetailsSpecs">
        <div className="productDetailsSpecs__title">
          <h3>Tech specs</h3>
          <Line />
        </div>
        <div className="productDetailsSpecs__specs">
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Screen</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.screen}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Resolution</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.resolution}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Processor</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.processor}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">RAM</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.ram}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Camera</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.camera}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Zoom</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.zoom}
            </div>
          </div>
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Cell</div>
            <div className="productDetailsSpecs__value">
              {selectedProduct.cell.join(', ')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return 'something wrong';
};
