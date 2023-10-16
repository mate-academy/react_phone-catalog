import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { getPhones } from '../../helpers/api';

export const PhonesPage: React.FC = () => {
  return (
    <PageContent
      title={Category.Phones}
      getProducts={getPhones}
    />
  );
};
