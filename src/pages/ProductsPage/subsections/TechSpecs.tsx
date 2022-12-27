import { FC } from 'react';
import { Product } from 'src/types/Product';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { getRenderedCapacity } from 'src/utils/helpers/getRenderedCapacity';
import { getRenderedRam } from 'src/utils/helpers/getRenderedRam';

type Props = {
  selectedProductDetails: ProdcutDetails,
  selectedProductGeneralInfo: Product,
};

export const TechSpecs: FC<Props> = ({
  selectedProductDetails,
  selectedProductGeneralInfo,
}) => {
  const {
    display,
    camera,
    battery,
  } = selectedProductDetails;

  const {
    ram,
    capacity,
  } = selectedProductGeneralInfo;

  const renderedCapacity = getRenderedCapacity(capacity) || '-';
  const renderedRam = getRenderedRam(ram) || '-';
  const renderedDisplay = display.screenSize || '-';
  const renderedCamera = camera.primary || '-';
  const renderedBattery = battery.type || '-';
  const renderedScreen = display.screenResolution || '-';

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
          <div className="card__feature-key tech-specs__key">RAM</div>
          <div className="card__feature-value tech-specs__value">
            {renderedRam}
          </div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key tech-specs__key">Battery</div>
          <div className="card__feature-value tech-specs__value">
            {renderedBattery}
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
