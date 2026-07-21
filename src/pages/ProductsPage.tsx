import { useState } from 'react';
import { Product } from '../types/Product';
import { useOutletContext, useParams } from 'react-router-dom';
import { CategoryTitle } from '../components/CategoryTitle/CategoryTitle';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Pagination } from '../components/Pagination/Pagination';
import styles from './ProductsPage.module.scss';
import { NotFoundPage } from './NotFoundPage';

type SortType = 'newest' | 'cheapest' | 'alphabetically';
type ItemsPerPage = '4' | '8' | '16' | 'all';

export const ProductsPage = () => {
  const { category } = useParams() as { category: string };
  const { products } = useOutletContext<{
    products: Product[];
  }>();
  const [sortType, setSortType] = useState<SortType>('newest');
  const [countItems, setCountItems] = useState<ItemsPerPage>('16');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const validCategories = ['phones', 'tablets', 'accessories'];

  if (!validCategories.includes(category)) {
    return <NotFoundPage />;
  }

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  //#region Sort region

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case 'newest':
        return b.year - a.year;

      case 'cheapest':
        return a.price - b.price;
      case 'alphabetically':
        return a.name.localeCompare(b.name);
    }
  });

  //#endregion

  //#region Items sort
  const perPage =
    countItems === 'all' ? sortedProducts.length : Number(countItems);
  const start = (currentPage - 1) * perPage;

  const sortedItems =
    countItems === 'all'
      ? sortedProducts
      : sortedProducts.slice(start, start + perPage);
  //#endregion

  return (
    <div className={styles.productsPage}>
      <CategoryTitle category={category} filteredProducts={filteredProducts} />

      <div className={styles.sortControl}>
        <Dropdown
          id="sortBy"
          label="Sort By"
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'cheapest', label: 'Cheapest' },
            { value: 'alphabetically', label: 'Alphabetically' },
          ]}
          value={sortType}
          onChange={value => setSortType(value as SortType)}
        />

        <Dropdown
          id="sortItems"
          label="Items on page"
          options={[
            { value: '4', label: '4' },
            { value: '8', label: '8' },
            { value: '16', label: '16' },
            { value: 'all', label: 'All' },
          ]}
          value={countItems}
          onChange={value => setCountItems(value as ItemsPerPage)}
        />
      </div>

      <ProductsList products={sortedItems} />
      <Pagination
        total={sortedProducts.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
