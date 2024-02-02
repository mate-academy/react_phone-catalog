import { Breadcrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import '../style/AccessoriesPage.scss';

export const AccessoriesPage = () => {
  return (
    <div className="accessories">
      <Breadcrumbs />
      <h1>Accessories Page</h1>
      <div className="accessories_product">
        No products on this section
      </div>
    </div>
  );
};
