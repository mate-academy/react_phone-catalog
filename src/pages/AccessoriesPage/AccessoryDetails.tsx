import { NavHistory } from '../ProductsPage/NavHistory/NavHistory';
import { ProductsDetails } from '../ProductsPage/ProductsDetails';

export const AccessoryDetails = () => {
  return (
    <div className="container">
      <NavHistory pageType="accessory" />
      <ProductsDetails />
    </div>
  );
};
