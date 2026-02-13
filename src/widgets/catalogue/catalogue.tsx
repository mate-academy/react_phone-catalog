import styles from './styles/catalogue.module.scss';
import { ProductCards } from '@ui/productCards/productCards';
import { ErrorMessage } from './ui';
import { CatalogueData, PerPage } from '@shared/api';
import { UILoadStatus } from '@features/useUILoader';
import { Category } from '@shared/types';

type Props = {
  data: CatalogueData | UILoadStatus;
  category: Category | 'favourites';
  currentPerPage: PerPage;
};

export const Catalogue = ({ data, category, currentPerPage }: Props) => {
  const fallbackAmount = currentPerPage === PerPage.ALL ? 8 : +currentPerPage;

  if (data === UILoadStatus.ERROR) {
    return <ErrorMessage msg={'Something went wrong...'} reload={true} />;
  }

  if (typeof data !== 'string' && data.items.length === 0) {
    return <ErrorMessage msg={`There are no items in ${category} yet`} />;
  }

  return (
    <ul className={styles.catalogue}>
      <ProductCards data={data} fallbackAmount={fallbackAmount} lazy={false} />
    </ul>
  );
};
