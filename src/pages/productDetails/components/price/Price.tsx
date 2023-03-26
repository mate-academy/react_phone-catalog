import { useContext, useMemo } from 'react';
import { AddToCart } from '../../../../components/addToCart/AddToCard';
import {
  AddToFavorite,
} from '../../../../components/addToFavorite/AddToFavorite';
import { GlobalContext } from '../../../../reducer';
import { Product } from '../../../../types/product';
import { IproductDetails } from '../../../../types/productDetails';
import { Property } from '../property/Property';

import './Price.scss';

type Props = {
  details: IproductDetails
};

export const Price:React.FC<Props> = ({ details }) => {
  const [state] = useContext(GlobalContext);

  const renderPrice = useMemo(() => {
    if (state.selectedProduct) {
      // eslint-disable-next-line max-len
      return Math.floor(state.selectedProduct?.price - (state.selectedProduct?.price / 100) * state.selectedProduct?.discount);
    }

    return 0;
  }, [state.selectedProduct]);

  return (
    <div className="details-product-price">
      <div className="price">
        <span className="price__new">
          {`$${renderPrice}`}
        </span>
        <span className="price__old">
          {renderPrice !== state.selectedProduct?.price
            && state.selectedProduct?.price}
        </span>
      </div>
      <div className="price-buttons">
        <AddToCart product={state.selectedProduct as Product} />
        <AddToFavorite product={state.selectedProduct as Product} />
      </div>
      <div className="specs">
        <div>
          <Property
            title="Screen"
            value={details.display.screenSize}
          />
          <Property
            title="Resolution"
            value={details.display.screenResolution}
          />
          <Property
            title="Processor"
            value={details.hardware.cpu}
          />
          <Property
            title="RAM"
            value={details.storage.ram}
          />
        </div>
      </div>
    </div>
  );
};
