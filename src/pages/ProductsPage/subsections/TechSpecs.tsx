import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { getRenderedCapacity } from 'src/utils/helpers/getRenderedCapacity';
import { getRenderedRam } from 'src/utils/helpers/getRenderedRam';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const TechSpecs: FC<Props> = ({
  selectedProductDetails,
}) => {
  const {
    camera,
    screen,
    resolution,
    ram,
    capacity,
    zoom,
  } = selectedProductDetails;

  const renderedCapacity = getRenderedCapacity(capacity) || '-';
  const renderedRam = getRenderedRam(ram) || '-';
  const renderedDisplay = screen || '-';
  const renderedCamera = camera || '-';
  const renderedScreen = resolution || '-';

  return (
    <div className="about__spec">
      <h1 className="about__title">Tech specs</h1>

      <div className="card__features tech-specs">
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">
            Capacity
          </div>
          <div className="card__feature-vaue tech-specs__value">
            {renderedCapacity}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">Screen</div>
          <div className="card__feature-vaue tech-specs__value">
            {renderedDisplay}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">Camera</div>
          <div className="card__feature-value tech-specs__value">
            {renderedCamera}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">Zoom</div>
          <div className="card__feature-value tech-specs__value">
            {zoom}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">RAM</div>
          <div className="card__feature-value tech-specs__value">
            {renderedRam}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">Display</div>
          <div className="card__feature-value tech-specs__value">
            {renderedScreen}
          </div>
        </div>
      </div>
    </div>
  );
};
