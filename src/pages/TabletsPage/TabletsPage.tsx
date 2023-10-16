import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { getTablets } from '../../helpers/api';

export const TabletsPage = () => {
  return (
    <PageContent
      title={Category.Tablets}
      getProducts={getTablets}
    />
  );
};
