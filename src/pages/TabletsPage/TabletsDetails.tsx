import { NavHistory } from '../ProductsPage/sections/NavHistory';
import { ProductsDetails } from '../ProductsPage/ProductsDetails';

export const TabletsDetails = () => {
  return (
    <div className="container">
      <NavHistory
        pageType="tablets"
      />
      <ProductsDetails />
    </div>
  );
};
