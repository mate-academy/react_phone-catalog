import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { getRenderedCapacity } from 'src/utils/helpers/getRenderedCapacity';
import { getRenderedRam } from 'src/utils/helpers/getRenderedRam';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const GeneralSpec: FC<Props> = ({
  selectedProductDetails,
}) => {
  const {
    screen,
    ram,
    capacity,
  } = selectedProductDetails;
  const renderedCapacity = getRenderedCapacity(capacity) || '-';
  const renderedRam = getRenderedRam(ram) || '-';
  const renderedDisplay = screen || '-';

  return (
    <div className="card__features specifications__card__features">
      <div className="card__feature">
        <div className="card__feature-key">Screen</div>
        <div className="card__feature-vaue">{renderedDisplay}</div>
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
