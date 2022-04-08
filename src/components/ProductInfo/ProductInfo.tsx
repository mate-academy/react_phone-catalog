import { FunctionComponent } from 'react';

// Styles
import './ProductInfo.scss';

// Types
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProdyctDetails';

// Components
import { CardButtons } from '../CardButtons';
import { TechSpecs } from '../TechSpecs';

type Props = {
  product: Product;
  details: ProductDetails;
};

export const ProductInfo: FunctionComponent<Props> = ({ product, details }) => {
  const {
    newPrice,
    price,
    screen,
    ram,
    id,
  } = product;

  const techSpecs = [
    { key: 'Screen', value: screen },
    { key: 'Resolution', value: details.display.screenResolution },
    { key: 'Processor', value: details.hardware.cpu },
    { key: 'RAM', value: ram },
  ];

  return (
    <div className="ProductInfo">
      <div className="ProductInfo__price">
        <span className="ProductInfo__newPrice">
          {`$${newPrice}`}
        </span>

        {price !== newPrice && (
          <span className="ProductInfo__oldPrice">
            {`$${price}`}
          </span>
        )}
      </div>

      <div className="ProductInfo__buttons">
        <CardButtons id={id} size="big" />
      </div>

      <TechSpecs techSpecs={techSpecs} isTextSmall />
    </div>
  );
};
