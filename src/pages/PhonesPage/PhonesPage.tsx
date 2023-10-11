import { PageContent } from '../../components/PageContent';
import { MenuItems } from '../../types/MenuItems';
import { getPhones } from '../../helpers/api';

export const PhonesPage: React.FC = () => {
  return (
    <PageContent
      title={MenuItems.Phones}
      getProducts={getPhones}
    />
  );
};
