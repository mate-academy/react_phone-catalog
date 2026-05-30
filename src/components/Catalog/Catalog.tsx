import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { Card } from '../../types/card';
import { ListControlPanel } from '../ListControlPanel';
import { ProductList } from '../ProductList';
import { Pages } from '../Pages/Pages';
import styles from './Catalog.module.scss';
import { useTranslation } from 'react-i18next';
import { getCorrectCase } from '../../utils/helpers';

type Props = {
  category: string;
  title: string;
};

export const Catalog: React.FC<Props> = ({ category, title }) => {
  const { t } = useTranslation();
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = Number(searchParams.get('itemsPerPage') || '');
  const page = Number(searchParams.get('page') || '');

  const devices = products
    .filter((item: Card) => item.category === category)
    .sort((item1, item2) => {
      if (!sort) {
        return item2.year - item1.year;
      }

      if (sort === 'alph') {
        return item1.name.localeCompare(item2.name);
      }

      if (sort === 'cheap') {
        return item1.price - item2.price;
      }

      return 0;
    });

  const pageAmount =
    itemsPerPage === 0 ? 0 : Math.ceil(devices.length / itemsPerPage);

  const visibleProducts = itemsPerPage
    ? devices.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
    : devices;

  return (
    <div className={styles.cataloge}>
      <h1 className={styles.cataloge__title}>{t(title)}</h1>
      <div className={styles.cataloge__items_amount}>
        {devices.length}{' '}
        {t(
          getCorrectCase(String(devices.length), [
            'model',
            'models2-4',
            'models5-0',
          ]),
        )}
      </div>

      <ListControlPanel />

      <ProductList products={visibleProducts} category={category} />

      {pageAmount > 1 && (
        <Pages pageAmount={pageAmount} products={visibleProducts} />
      )}
    </div>
  );
};
