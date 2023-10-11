import { PageContent } from '../../components/PageContent';
import { MenuItems } from '../../types/MenuItems';
import { getTablets } from '../../helpers/api';

export const TabletsPage = () => {
  return (
    <PageContent
      title={MenuItems.Tablets}
      getProducts={getTablets}
    />
  );
};
