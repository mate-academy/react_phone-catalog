import Card from '../../../shared/components/Card';
import styles from './DevicesList.module.scss';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../shared/types';

const DevicesList: React.FC<{ products: Product[] }> = memo(({ products }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const perPage = searchParams.get('perPage') || null;
  const activePage = searchParams.get('page') || 1;

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getCardsPerPage = () => {
    if (perPage) {
      const startIndex = activePage === 1 ? 0 : (+activePage - 1) * +perPage;
      const endIndex = +perPage * +activePage;

      return sortedProducts.slice(startIndex, endIndex);
    }

    return sortedProducts;
  };

  const productsPerPage = getCardsPerPage();

  return (
    <div className={styles.list}>
      {productsPerPage.map(device => (
        <div key={device.id} className={styles.list__card}>
          <Card item={device}></Card>
        </div>
      ))}
    </div>
  );
});

export default DevicesList;

DevicesList.displayName = 'DevicesList';
