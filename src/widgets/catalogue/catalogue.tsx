import { Status } from '@features/index';
import { CatalogueData, Category, ItemsAmount } from '@shared/api/types';
import styles from './styles/catalogue.module.scss';
import { ProductCards } from '@ui/productCards/productCards';
import { ErrorMessage } from './ui';

type Props = {
  data: CatalogueData | Status;
  category: Category | 'favourites';
  currentPerPage: ItemsAmount;
};

export const Catalogue = ({ data, category, currentPerPage }: Props) => {
  const fallbackAmount =
    currentPerPage === ItemsAmount.ALL ? 8 : +currentPerPage;

  if (data === Status.ERROR) {
    return <ErrorMessage msg={'Something went wrong...'} />;
  }

  if (typeof data !== 'string' && data.items.length === 0) {
    return <ErrorMessage msg={`There are no items in ${category} yet`} />;
  }

  return (
    <ul className={styles.catalogue}>
      <ProductCards data={data} fallbackAmount={fallbackAmount} />
    </ul>
  );
};
