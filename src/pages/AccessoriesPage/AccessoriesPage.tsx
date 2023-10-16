import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { getAccessories } from '../../helpers/api';

export const AccessoriesPage = () => {
  return (
    <PageContent
      title={Category.Accessories}
      getProducts={getAccessories}
    />
  );
};
