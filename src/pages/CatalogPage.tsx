import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Pagination from '../components/Pagination/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';

export const CatalogPage = () => {
  return (
    <div className="catalog-page">
      <Breadcrumbs />

      <ProductFilter />

      <ProductContent />

      <Pagination />
    </div>
  );
};
