import { ProductsDetails } from '../ProductsPage/ProductsDetails';
import { NavHistory } from '../ProductsPage/sections/NavHistory';

export const PhoneDetails = () => {
  return (
    <div className="container">
      <NavHistory pageType="phones" />
      <ProductsDetails />
    </div>
  );
};
