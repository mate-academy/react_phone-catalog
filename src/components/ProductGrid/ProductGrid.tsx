import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';
import { sortProducts } from '../../utils/sortProducts';
import { Product } from '../../types/Product';
import { useCallback, useEffect, useState } from 'react';
import { getProductsByCategory } from '../../utils/fetchClient';
import { useSearchParams } from 'react-router-dom';
import { SortOptions } from '../../enums/SortOptions';
import { ItemsOnPage } from '../../enums/ItemsOnPage';
import { Loader } from '../Loader/Loader';
import { Dropdown } from '../Dropdown/Dropdown';
import { Pagination } from '../Pagination/Pagination';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

type Props = {
  category: string;
  title: string;
};

export const ProductGrid: React.FC<Props> = ({ category, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'age';
  const onPage = searchParams.get('onPage') || ItemsOnPage.four;
  const currPage = parseInt(searchParams.get('page') || '1');

  const shownOnPage = onPage === 'all' ? products.length : parseInt(onPage);
  const all = products.length;

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProductsByCategory(category);
        const sortedProducts = sortProducts(sortBy, fetchedProducts);

        setProducts(sortedProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSortProducts();
  }, [category, sortBy]);

  const handleSorting = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ sortBy: event.target.value, page: '1', onPage });
    },
    [setSearchParams, onPage],
  );

  const handleShowingOnPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ onPage: event.target.value, page: '1', sort: sortBy });
    },
    [setSearchParams, onPage],
  );

  const handleChangingPage = useCallback(
    (newPage: number) => {
      setSearchParams({ page: String(newPage), onPage, sort: sortBy });
    },
    [setSearchParams, onPage, SortOptions],
  );

  const startIndex = (currPage - 1) * shownOnPage;

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.screen.toLowerCase().includes(query.toLowerCase()) ||
      product.capacity.toLowerCase().includes(query.toLowerCase()) ||
      product.color.toLowerCase().includes(query.toLowerCase()) ||
      product.ram.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedProducts = filteredProducts.slice(
    startIndex,
    startIndex + shownOnPage,
  );

  if (isLoading) {
    return <Loader />;
  }

  const isPaginationVisible = filteredProducts.length > 0 && onPage !== 'all';

  return (
    <div className={styles.productsPage}>
      <div className={styles.upperContainer}>
        <Breadcrumbs />

        <h1 className={styles.pageTitle}>{title}</h1>

        <p className={styles.count}>
          {`${products.length} model${products.length > 1 ? 's' : ''}`}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <p className={styles.noProducts}>There are no such products.</p>
      ) : (
        <>
          <div className={styles.filtersContainer}>
            <div className={styles.sortBy}>
              <Dropdown
                label="Sort by"
                value={sortBy}
                options={Object.entries(SortOptions).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
                onChange={handleSorting}
              />
            </div>

            <div className={styles.itemsOnPage}>
              <Dropdown
                label="Items on page"
                value={onPage}
                options={Object.values(ItemsOnPage).map(value => ({
                  value,
                  label: value,
                }))}
                onChange={handleShowingOnPage}
              />
            </div>
          </div>

          <div className={styles.productCardContainer}>
            {selectedProducts.map(product => (
              <section className={styles.productCard} key={product.id}>
                <ProductCard product={product} />
              </section>
            ))}
          </div>

          {isPaginationVisible && (
            <Pagination
              shownOnPage={shownOnPage}
              currPage={currPage}
              all={all}
              handleChangingPage={handleChangingPage}
            />
          )}
        </>
      )}
    </div>
  );
};
