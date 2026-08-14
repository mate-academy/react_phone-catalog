import { useContext } from 'react';
import { StatesContext } from '../../base/store/GlobalStateProvider';
import { Line } from '../../base/Line/Line';

export const ProductDetailsSpecs = () => {
  const { selectedProduct } = useContext(StatesContext);

  if (!selectedProduct) {
    return <div>something wrong</div>;
  }

  const specs = selectedProduct.specs;

  if (!specs) {
    return (
      <div className="productDetailsSpecs">
        <div className="productDetailsSpecs__title">
          <h3>Tech specs</h3>
          <Line />
        </div>
        <p>Technical specifications not available for this product.</p>
      </div>
    );
  }

  const hasSpecs =
    specs.screen || specs.resolution || specs.processor || specs.ram;

  if (!hasSpecs) {
    return (
      <div className="productDetailsSpecs">
        <div className="productDetailsSpecs__title">
          <h3>Tech specs</h3>
          <Line />
        </div>
        <p>Technical specifications not available for this product.</p>
      </div>
    );
  }

  return (
    <div className="productDetailsSpecs">
      <div className="productDetailsSpecs__title">
        <h3>Tech specs</h3>
        <Line />
      </div>

      <div className="productDetailsSpecs__specs">
        {specs.screen && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Screen</div>
            <div className="productDetailsSpecs__value">{specs.screen}</div>
          </div>
        )}

        {specs.resolution && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Resolution</div>
            <div className="productDetailsSpecs__value">{specs.resolution}</div>
          </div>
        )}

        {specs.processor && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Processor</div>
            <div className="productDetailsSpecs__value">{specs.processor}</div>
          </div>
        )}

        {specs.ram && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">RAM</div>
            <div className="productDetailsSpecs__value">{specs.ram}</div>
          </div>
        )}

        {specs.camera && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Camera</div>
            <div className="productDetailsSpecs__value">{specs.camera}</div>
          </div>
        )}

        {specs.zoom && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Zoom</div>
            <div className="productDetailsSpecs__value">{specs.zoom}</div>
          </div>
        )}

        {specs.cell && (
          <div className="productDetailsSpecs__line">
            <div className="productDetailsSpecs__key">Cell</div>
            <div className="productDetailsSpecs__value">
              {specs.cell.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
