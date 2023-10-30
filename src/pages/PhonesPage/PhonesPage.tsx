import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const PhonesPage = () => (
  <>
    <Breadcrumbs
      currentPage="Phones"
      productType={null}
    />
    <Catalog
      title="Mobile phones"
      productType="phone"
    />
  </>
);
