import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsPageLayout } from '../../components/ProductsPageLayout/ProductsPageLayout';

export const TabletsPage = () => {
  return (
    <>
      <Breadcrumbs categoryName="Tablets" />
      <ProductsPageLayout type="tablets" pageTitle="Tablets" />
    </>
  );
};
