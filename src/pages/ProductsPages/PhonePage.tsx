import { ProductList } from '../../Components/ProductList/ProductList';
import './ProductsPages.scss';

export const PhonePage = () => {
  return (
    <div className="content product-page">
      <ProductList pageName="Phones" title="Mobile phones" />
    </div>
  );
};
