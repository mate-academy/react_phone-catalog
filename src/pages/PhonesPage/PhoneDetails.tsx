import { ProductsDetails } from '../ProductsPage/ProductsDetails';
import { NavHistory } from '../ProductsPage/NavHistory/NavHistory';

export const PhoneDetails = () => {
  return (
    <div className="container">
      <NavHistory pageType="phones" />
      <ProductsDetails />
    </div>
  );
};
