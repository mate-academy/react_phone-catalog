import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const TabletsPage = () => (
  <>
    <Breadcrumbs
      currentPage="Tablets"
      productType={null}
    />
    <Catalog
      title="Tablets"
      productType="tablet"
    />
  </>
);
