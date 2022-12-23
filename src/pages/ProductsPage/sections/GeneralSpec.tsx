import { FC } from 'react';
import { Product } from 'src/types/Product';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { getRenderedCapacity, getRenderedRam } from 'src/utils/helpers';

type Props = {
  selectedProductDetails: ProdcutDetails,
  selectedProductGeneralInfo: Product,
};

export const GeneralSpec: FC<Props> = ({
  selectedProductDetails,
  selectedProductGeneralInfo,
}) => {
  const {
    display,
  } = selectedProductDetails;

  const {
    ram,
    capacity,
  } = selectedProductGeneralInfo;

  const renderedCapacity = getRenderedCapacity(capacity) || '-';
  const renderedRam = getRenderedRam(ram) || '-';

  return (
    <div className="card__features specifications__card__features">
      <div className="card__feature">
        <div className="card__feature-key">Screen</div>
        <div className="card__feature-vaue">{display.screenSize}</div>
      </div>
      <div className="card__feature">
        <div className="card__feature-key">Capacity</div>
        <div className="card__feature-vaue">{renderedCapacity}</div>
      </div>
      <div className="card__feature">
        <div className="card__feature-key">RAM</div>
        <div className="card__feature-vaue">{renderedRam}</div>
      </div>
    </div>
  );
};
