import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsPageLayout } from '../../components/ProductsPageLayout/ProductsPageLayout';

export const AccessoriesPage = () => (
  <>
    <Breadcrumbs categoryName="Tablets" />
    <ProductsPageLayout type="accessories" pageTitle="Accessories" />;
  </>
);
