import { useMemo, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { mapProductToCard } from '../../utils/mapProductToCard';
import { useProducts } from '../../hooks/useProducts';
import styles from './CatalogPage.module.scss';
import { SelectProduct } from './SelectProduct/SelectProduct';
// import { Pagination } from '../../components/Pagination/Pagination';
// import { useSearchParams } from 'react-router-dom';

type SortType = 'age' | 'title' | 'price';

export const CatalogPage = () => {
  const { products } = useProducts();

  const phones = useMemo(
    () =>
      products
        .filter(product => product.category === 'phones')
        .map(mapProductToCard),
    [products],
  );

  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortType>('age');

  const sortedPhones = useMemo(() => {
    const result = [...phones];

    switch (sortBy) {
      case 'title':
        return result.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return result.sort((a, b) => a.price - b.price);

      case 'age':
        return result.sort((a, b) => b.year - a.year);

      default:
        return result;
    }
  }, [phones, sortBy]);

  if (!products.length) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(sortedPhones.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visiblePhones = sortedPhones.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className={styles.catalog}>
      <h1 className={styles.title}>Mobile phones</h1>

      <p className={styles.catalogCount}>{phones.length} models</p>

      <div className={styles.catalogSorts}>
        <SelectProduct
          label="Sort by"
          value={sortBy}
          onChange={val => {
            setSortBy(val as SortType);
            setCurrentPage(1);
          }}
          options={[
            { label: 'Newest', value: 'age' },
            { label: 'Alphabetically', value: 'title' },
            { label: 'Cheapest', value: 'price' },
          ]}
        />

        <SelectProduct
          label="Items on page"
          value={itemsPerPage}
          onChange={val => {
            setItemsPerPage(Number(val));
            setCurrentPage(1);
          }}
          options={[
            { label: '4', value: 4 },
            { label: '8', value: 8 },
            { label: '16', value: 16 },
            { label: '32', value: 32 },
          ]}
        />
      </div>

      <div className={styles.catalogGrid}>
        {visiblePhones.map(item => (
          <ProductCard key={item.id} {...item} showDiscount />
        ))}
      </div>

      <div className={styles.paginationCatalog}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            className={styles.pageButton}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* <Pagination /> */}
    </div>
  );
};
