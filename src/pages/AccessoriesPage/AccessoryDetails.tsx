import { NavHistory } from '../ProductsPage/sections/NavHistory';
import { ProductsDetails } from '../ProductsPage/ProductsDetails';

export const AccessoryDetails = () => {
  return (
    <div className="container">
      <NavHistory pageType="accessory" />
      <ProductsDetails />
    </div>
  );
};
