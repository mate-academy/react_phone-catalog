import { ProductList } from '../../Components/ProductList/ProductList';
import './ProductsPages.scss';

export const TabletPage = () => {
  return (
    <div className="content product-page">
      <ProductList pageName="Tablets" title="Tablets" />
    </div>
  );
};
