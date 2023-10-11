import { PageContent } from '../../components/PageContent';
import { MenuItems } from '../../types/MenuItems';
import { getAccessories } from '../../helpers/api';

export const AccessoriesPage = () => {
  return (
    <PageContent
      title={MenuItems.Accessories}
      getProducts={getAccessories}
    />
  );
};
