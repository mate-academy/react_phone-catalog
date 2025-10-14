import { Status } from '@features/index';
import { CatalogueData, Category, ItemsAmount } from '@shared/api/types';
import { CatalogueGrid, CatalogueGridSkeleton, ErrorMessage } from './ui';

type Props = {
  data: CatalogueData | Status;
  category: Category | 'favourites';
  currentPerPage: ItemsAmount;
};

export const Catalogue = ({ data, category, currentPerPage }: Props) => {
  switch (data) {
    case Status.ERROR:
      return <ErrorMessage msg={'Something went wrong. Please, retry'} />;
    case Status.LOADING:
      return <CatalogueGridSkeleton currentPerPage={currentPerPage} />;
    default:
      if (data.items.length < 1) {
        return <ErrorMessage msg={`There are no goods in ${category}`} />;
      } else {
        return <CatalogueGrid data={data} />;
      }
  }
};
