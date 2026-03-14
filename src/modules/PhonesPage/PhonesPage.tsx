import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsPageLayout } from '../../components/ProductsPageLayout/ProductsPageLayout';

export const PhonesPage = () => (
  <>
    <Breadcrumbs categoryName="Phones" />
    <ProductsPageLayout type="phones" pageTitle="Mobile phones" />
  </>
);
