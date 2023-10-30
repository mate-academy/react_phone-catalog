import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AccessoriesPage = () => (
  <>
    <Breadcrumbs
      currentPage="Accessories"
      productType={null}
    />
    <Catalog
      title="Accessories"
      productType="accessory"
    />
  </>
);
